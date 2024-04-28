export type ConnectionScheme = 'http' | 'https';

export interface EditConnectionValue {
  scheme: ConnectionScheme;
  host: string | null;
  httpPort: number | null;
}
