import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent {
  public control = input.required<AbstractControl | null>();

  public getErrors(): Array<string> {
    const errors = this.control()?.errors;
    if (!errors) {
      return [];
    }

    return Object.entries(errors).map(([key, value]) => {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must be at least ${value.requiredLength} characters long`;
        case 'maxlength':
          return `This field must be at most ${value.requiredLength} characters long`;
        case 'pattern':
          return 'This field does not match the required pattern';
        default:
          return `Unknown error: ${key}`;
      }
    });
  }
}
