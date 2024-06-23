import { InitialisedWeaviateConnection, WeaviateConnectionConfig } from './connection.types';
import { Property } from './weaviate.types';

export interface ConnectionTreeItem {
  id: number;
  connectionId?: number;
  collectionName?: string;
  properties: Array<Property>;
  collections: Array<string>;
  connection: WeaviateConnectionConfig | InitialisedWeaviateConnection;
}
