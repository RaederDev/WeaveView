import { InitialisedWeaviateConnection, WeaviateConnectionConfig } from '../types/connection.type';
import { Property } from '../types/weaviate.types';

export interface ConnectionTreeItem {
  id: number;
  connectionId?: number;
  collectionName?: string;
  properties: Array<Property>;
  collections: Array<string>;
  connection: WeaviateConnectionConfig | InitialisedWeaviateConnection;
}
