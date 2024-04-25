import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ConnectionTreeItem } from '../../models/tree.types';
import { TreeNodeSelectEvent } from 'primeng/tree';

@Component({
  selector: 'app-connection-tree',
  templateUrl: './connection-tree.component.html',
})
export class ConnectionTreeComponent {
  public connectionTree: Array<TreeNode<ConnectionTreeItem>> = [
    {
      label: '[ ✔︎ ] - Localhost',
      icon: 'pi pi-database',
      selectable: false,
      children: [
        {
          label: 'Collections',
          icon: 'pi pi-table',
          selectable: false,
          children: [
            {
              label: 'users',
              icon: 'pi pi-file',
            },
            {
              label: 'sites',
              icon: 'pi pi-file',
            },
          ],
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
        },
      ],
    },
    {
      label: 'Very long connection name test',
      icon: 'pi pi-database',
      selectable: false,
      children: [
        {
          label: 'Collections',
          icon: 'pi pi-table',
          selectable: false,
          children: [
            {
              label: 'Collections',
            },
            {
              label: 'Grandchild 2',
            },
          ],
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
        },
      ],
    },
  ];

  public onNodeSelect($event: TreeNodeSelectEvent) {
    console.log($event);
  }
}
