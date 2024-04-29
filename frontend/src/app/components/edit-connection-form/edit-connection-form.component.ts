import { Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectionScheme, EditConnectionValue } from '../../types/create-connection.types';

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

  public testConnection() {}

  public onSubmit() {
    if (this.form.invalid) {
      this.showErrors.set(true);
      return;
    }
    this.connectionEdited.emit({
      scheme: this.form.value.scheme as ConnectionScheme,
      host: this.form.value.host as string,
      httpPort: this.form.value.httpPort as number,
      label: this.form.value.label as string,
    });
  }
}
