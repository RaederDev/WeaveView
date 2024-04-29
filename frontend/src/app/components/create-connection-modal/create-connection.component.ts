import { Component, inject, model, signal } from '@angular/core';
import { EditConnectionValue } from '../../types/create-connection.types';
import { ConnectionManagerService } from '../../services/connection-manager.service';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
})
export class CreateConnectionComponent {
  public visible = model<boolean>(false);
  public values = signal<EditConnectionValue>({
    scheme: 'http',
    host: '',
    httpPort: 8080,
    label: '',
  });
  private connectionManagerService = inject(ConnectionManagerService);

  public onConnectionAdded(createConnection: EditConnectionValue) {
    this.connectionManagerService.addNewConnection(createConnection);
    this.visible.set(false);
  }
}
