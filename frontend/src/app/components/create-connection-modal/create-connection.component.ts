import { Component, model, signal } from '@angular/core';
import { EditConnectionValue } from '../../types/create-connection.types';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
})
export class CreateConnectionComponent {
  public visible = model<boolean>(false);
  public values = signal<EditConnectionValue>({
    scheme: 'http',
    host: null,
    httpPort: null,
  });

  public onConnectionAdded(createConnection: EditConnectionValue) {
    console.log('create->', createConnection);
  }

  public hide() {
    this.visible.set(false);
  }
}
