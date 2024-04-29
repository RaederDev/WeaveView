export interface Property {
  dataType: Array<string>;
  indexFilterable: boolean;
  indexSearchable: boolean;
  moduleConfig: Record<string, unknown>;
  name: string;
  tokenization?: string;
  description?: string;
}

export interface Collection {
  CollectionName: string;
  Properties: Array<Property>;
}
