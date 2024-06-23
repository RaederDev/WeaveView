import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { SelectedCollection } from '../connection-tree/connection-tree.component';
import { ConnectionManagerService } from '../../services/connection-manager.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { MessageService } from 'primeng/api';

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
  public collectionCount = signal<number>(0);
  public loading = signal<boolean>(false);
  public lastOffset = signal<number>(0);
  public lastRows = signal<number>(10);
  private connectionManagerService = inject(ConnectionManagerService);
  private messageService = inject(MessageService);

  public constructor() {
    effect(() => {
      untracked(() => {
        this.loadCollectionCount();
      });
    });
  }

  public loadData(event: TableLazyLoadEvent) {
    const idx = event?.first || 0;
    this.loadCollectionItems(idx, event?.rows || 10);
  }

  public reloadData() {
    this.loadCollectionItems(this.lastOffset(), this.lastRows());
  }

  private async loadCollectionCount() {
    try {
      const selectedCollection = this.selectedCollection();
      if (!selectedCollection) {
        return;
      }

      const count = await this.connectionManagerService.getCollectionCount(
        selectedCollection.connection,
        selectedCollection.collection,
      );
      if (count === 0) {
        return;
      }
      this.collectionCount.set(count);
    } catch (error) {
      console.error('loadCollectionCount', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load collection count',
      });
    }
  }

  private async loadCollectionItems(offset: number, rows: number) {
    try {
      this.loading.set(true);
      this.lastOffset.set(offset);
      this.lastRows.set(rows);
      const selectedCollection = this.selectedCollection();
      if (!selectedCollection) {
        return;
      }
      const collectionItems = await this.connectionManagerService.getCollectionItems(
        selectedCollection.connection,
        selectedCollection.collection,
        selectedCollection.properties.map(property => property.name),
        rows,
        offset,
      );
      const tableContent: Array<Record<string, unknown>> = collectionItems.map(item => ({
        id: (item._additional as Record<string, string>).id || '',
        ...item,
      }));
      this.tableContent.set(tableContent);
    } catch (error) {
      console.error('loadCollectionItems', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load collection items',
      });
    } finally {
      this.loading.set(false);
    }
  }
}
