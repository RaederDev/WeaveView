import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { SelectedCollection } from '../connection-tree/connection-tree.component';
import { ConnectionManagerService } from '../../services/connection-manager.service';

interface Header {
  name: string;
  label: string;
}

@Component({
  selector: 'app-connection-view',
  templateUrl: './connection-view.component.html',
})
export class ConnectionViewComponent {
  public selectedCollection = input.required<SelectedCollection | null>();
  public headers = computed<Array<Header>>(() => {
    const selectedCollection = this.selectedCollection();
    if (!selectedCollection) {
      return [];
    }
    const headers = selectedCollection.properties.map(property => ({
      name: property.name,
      label: `${property.name} (${property.dataType})`,
    }));
    return [
      {
        name: 'id',
        label: 'ID',
      },
      ...headers,
    ];
  });
  public tableContent = signal<Array<Record<string, unknown>>>([]);
  private connectionManagerService = inject(ConnectionManagerService);

  public constructor() {
    effect(() => {
      console.log('ConnectionViewComponent');
      console.log(this.selectedCollection());
      untracked(() => {
        this.loadCollectionItems();
      });
    });
  }

  private async loadCollectionItems() {
    const selectedCollection = this.selectedCollection();
    if (!selectedCollection) {
      return;
    }
    const count = await this.connectionManagerService.getCollectionCount(
      selectedCollection.connection,
      selectedCollection.collection,
    );
    console.log('count', count);
    if (count === 0) {
      return;
    }
    const collectionItems = await this.connectionManagerService.getCollectionItems(
      selectedCollection.connection,
      selectedCollection.collection,
      selectedCollection.properties.map(property => property.name),
      10,
      '',
    );
    const tableContent: Array<Record<string, unknown>> = collectionItems.map(item => ({
      id: (item._additional as Record<string, string>).id || '',
      ...item,
    }));
    this.tableContent.set(tableContent);
    console.log('collectionItems', tableContent);
  }
}
