import { Component, computed, inject, output, signal } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ConnectionTreeItem } from '../../models/tree.types';
import { ConnectionManagerService } from '../../services/connection-manager.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  InitialisedWeaviateConnection,
  WeaviateConnectionConfig,
} from '../../types/connection.type';
import { TreeNodeContextMenuSelectEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { Property } from '../../types/weaviate.types';

export interface SelectedCollection {
  connection: InitialisedWeaviateConnection;
  collection: string;
  properties: Array<Property>;
}

@Component({
  selector: 'app-connection-tree',
  templateUrl: './connection-tree.component.html',
})
export class ConnectionTreeComponent {
  private connectionManagerService = inject(ConnectionManagerService);
  private messageService = inject(MessageService);
  public connections = toSignal<Array<WeaviateConnectionConfig | InitialisedWeaviateConnection>>(
    this.connectionManagerService.connections,
    { requireSync: true },
  );
  public connectionTree = computed<Array<TreeNode<ConnectionTreeItem>>>(() => {
    const sorted = this.connections().sort((a, b) => a.sortOrder - b.sortOrder);
    return this.buildConnectionTree(sorted);
  });
  public menuItems = signal<Array<MenuItem>>([]);
  public connecting = signal<boolean>(false);
  public onCollectionSelected = output<SelectedCollection>();

  public buildConnectionTree(
    connections: Array<WeaviateConnectionConfig | InitialisedWeaviateConnection>,
  ) {
    return connections.map(connection => {
      const treeItem: TreeNode<ConnectionTreeItem> = {
        label: connection.label,
        icon: 'pi pi-database',
        selectable: false,
        data: {
          collections: [],
          id: connection.id,
          connectionId: undefined,
          connection: connection,
          properties: [],
        },
        children: [],
      };
      if ((connection as InitialisedWeaviateConnection).status === 'connected') {
        const initConnection = connection as InitialisedWeaviateConnection;
        treeItem.data!.connectionId = initConnection.connectionId;
        treeItem.children = [
          {
            label: 'Collections',
            icon: 'pi pi-table',
            selectable: false,
            children: initConnection.collections.map(collection => ({
              label: collection.CollectionName,
              icon: 'pi pi-file',
              data: {
                id: connection.id,
                connectionId: initConnection.connectionId,
                collectionName: collection.CollectionName,
                properties: collection.Properties,
                collections: [],
                connection: connection,
              },
            })),
          },
        ];
      }
      return treeItem;
    });
  }

  public onMenuSelect($event: TreeNodeContextMenuSelectEvent) {
    const node: TreeNode<ConnectionTreeItem> = $event.node;
    if (!node.data) {
      return;
    }
    if (this.connecting()) {
      this.menuItems.set([
        {
          label: 'Currently connecting...',
          icon: 'pi pi-spin pi-spinner',
        },
      ]);
    } else if (node.data.connectionId === undefined) {
      this.menuItems.set([
        {
          label: 'Connect',
          icon: 'pi pi-plus',
          command: () => this.connect(node.data!),
        },
      ]);
    } else {
      this.menuItems.set([
        {
          label: 'Disconnect',
          icon: 'pi pi-minus',
          command: () => {
            console.log('Disconnect');
          },
        },
      ]);
    }
  }

  public onNodeSelect(treeNode: TreeNodeSelectEvent) {
    this.onCollectionSelected.emit({
      connection: treeNode.node.data!.connection,
      collection: treeNode.node.data!.collectionName,
      properties: treeNode.node.data!.properties,
    });
  }

  private async connect(item: ConnectionTreeItem) {
    this.connecting.set(true);
    try {
      await this.connectionManagerService.connect(item!.connection);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error while connecting to Weaviate',
      });
      console.error(error);
    } finally {
      this.connecting.set(false);
    }
  }
}
