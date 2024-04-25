import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public constructor() {}

  public open(): void {
    go.main.App.ShowDialog();
  }
}
