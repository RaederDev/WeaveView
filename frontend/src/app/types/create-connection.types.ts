export type ConnectionScheme = 'http' | 'https';

export interface EditConnectionValue {
  label: string;
  scheme: ConnectionScheme;
  host: string;
  httpPort: number;
}
