export interface WeaviateConnectionConfig {
  id: number;
  label: string;
  host: string;
  scheme: string;
  port: number;
}

export interface InitialisedWeaviateConnection extends WeaviateConnectionConfig {
  connectionId: number;
  status: 'connected' | 'disconnected';
}
