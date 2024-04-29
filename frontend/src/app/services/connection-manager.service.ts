import { inject, Injectable } from '@angular/core';
import { InitialisedWeaviateConnection, WeaviateConnectionConfig } from '../types/connection.type';
import { EditConnectionValue } from '../types/create-connection.types';
import { StorageService } from './storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../types/weaviate.types';

@Injectable({
  providedIn: 'root',
})
export class ConnectionManagerService {
  public connections = new BehaviorSubject<
    Array<WeaviateConnectionConfig | InitialisedWeaviateConnection>
  >([]);
  private storageService = inject(StorageService);

  public async connect(connection: WeaviateConnectionConfig) {
    const existingConnections = this.connections.value;
    const found = existingConnections.find(c => c.id === connection.id);
    if (!found) {
      throw new Error('Connection not found');
    }
    if ((found as InitialisedWeaviateConnection).status === 'connected') {
      throw new Error('Connection already connected');
    }
    const connectionRes = await this.connectToWeaviate(connection);
    const initialisedConnection: InitialisedWeaviateConnection = {
      ...connection,
      connectionId: connectionRes[0],
      collections: connectionRes[1],
      status: 'connected',
    };

    this.connections.next([
      ...existingConnections.filter(c => c.id !== connection.id),
      initialisedConnection,
    ]);
  }

  public loadConnections() {
    const connections =
      this.storageService.getItem<Array<WeaviateConnectionConfig>>(StorageKey.CONNECTIONS) || [];
    this.connections.next(connections);
  }

  public addNewConnection(connection: EditConnectionValue) {
    const storedConnections =
      this.storageService.getItem<Array<WeaviateConnectionConfig>>(StorageKey.CONNECTIONS) || [];
    const lastConnectionId =
      this.storageService.getItem<number>(StorageKey.LAST_CONNECTION_ID) || 0;
    const newConnectionId = lastConnectionId + 1;
    const existingConnections = this.connections.value;
    existingConnections.forEach(c => (c.sortOrder += 1));
    storedConnections.forEach(c => (c.sortOrder += 1));
    const newConnection: WeaviateConnectionConfig = {
      id: newConnectionId,
      sortOrder: 0,
      ...connection,
    };
    storedConnections.push(newConnection);
    existingConnections.push(newConnection);
    this.storageService.setItem(StorageKey.CONNECTIONS, storedConnections);
    this.storageService.setItem(StorageKey.LAST_CONNECTION_ID, newConnectionId);
    this.connections.next([...existingConnections]);
  }

  private async connectToWeaviate(
    connection: WeaviateConnectionConfig,
  ): Promise<[number, Array<Collection>]> {
    const res: number = await go.main.App.ConnectToWeaviate(
      connection.host,
      connection.scheme,
      connection.httpPort,
    );
    const connectSuccess = await go.main.App.HealthCheck(res);
    const collections = await go.main.App.ListCollections(res);
    console.log('connectSuccess', connectSuccess);
    console.log('collections', collections);
    return [res, collections];
  }
}
