import { Collection } from './weaviate.types';

export interface WeaviateConnectionConfig {
  id: number;
  label: string;
  host: string;
  scheme: string;
  httpPort: number;
  sortOrder: number;
}

export interface InitialisedWeaviateConnection extends WeaviateConnectionConfig {
  connectionId: number;
  collections: Array<Collection>;
  status: 'connected' | 'disconnected';
}
