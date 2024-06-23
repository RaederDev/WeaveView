import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectionScheme, EditConnectionValue } from '../../types/create-connection.types';
import { ConnectionManagerService } from '../../services/connection-manager.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-connection-form',
  templateUrl: './edit-connection-form.component.html',
})
export class EditConnectionFormComponent {
  public values = input.required<EditConnectionValue>();
  public connectionEdited = output<EditConnectionValue>();
  public showErrors = signal<boolean>(false);
  public schemes: Array<{
    value: ConnectionScheme;
    label: string;
  }> = [
    { value: 'http', label: 'HTTP' },
    { value: 'https', label: 'HTTPS' },
  ];
  public form = new FormGroup({
    label: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    host: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    scheme: new FormControl<ConnectionScheme>('http'),
    httpPort: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });
  private connectionManagerService = inject(ConnectionManagerService);
  private messageService = inject(MessageService);

  public constructor() {
    effect(
      () => {
        this.form.patchValue(this.values());
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  public async testConnection() {
    if (this.form.invalid) {
      this.showErrors.set(true);
      return;
    }
    const testConnection = await this.connectionManagerService.testConnection(
      this.getEditConnectionValue(),
    );

    if (!testConnection) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error while connecting to Weaviate',
      });
      return;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Connection successful',
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.showErrors.set(true);
      return;
    }
    this.connectionEdited.emit(this.getEditConnectionValue());
  }

  private getEditConnectionValue(): EditConnectionValue {
    return {
      scheme: this.form.value.scheme as ConnectionScheme,
      host: this.form.value.host as string,
      httpPort: this.form.value.httpPort as number,
      label: this.form.value.label as string,
    };
  }
}
