export type ConnectionTreeItem = CollectionItem | SettingsItem;

interface BaseItem {
  connectionId: number;
  type: 'collection' | 'settings';
}

export interface CollectionItem extends BaseItem {
  type: 'collection';
  id: number;
}

export interface SettingsItem extends BaseItem {
  type: 'settings';
}
