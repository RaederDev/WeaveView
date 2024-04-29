import { InitialisedWeaviateConnection, WeaviateConnectionConfig } from '../types/connection.type';

export interface ConnectionTreeItem {
  id: number;
  connectionId: number | undefined;
  collections: Array<string>;
  connection: WeaviateConnectionConfig | InitialisedWeaviateConnection;
}
