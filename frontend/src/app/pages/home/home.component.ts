import { Component, model, signal } from '@angular/core';
import { SelectedCollection } from '../../components/connection-tree/connection-tree.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public createConnectionVisible = signal<boolean>(false);
  public selectedCollection = model<SelectedCollection | null>(null);
}
