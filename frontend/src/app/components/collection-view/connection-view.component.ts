import { Component, input } from '@angular/core';
import { SelectedCollection } from '../connection-tree/connection-tree.component';

@Component({
  selector: 'app-connection-view',
  templateUrl: './connection-view.component.html',
})
export class ConnectionViewComponent {
  public selectedCollection = input.required<SelectedCollection | null>();
  public tableContent = [
    {
      name: 'Table 1',
      country: 'USA',
    },
    {
      name: 'Table 2',
      country: 'Germany',
    },
    {
      name: 'Table 3',
      country: 'UK',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
    {
      name: 'Table 4',
      country: 'Japan',
    },
  ];
}
