import { Injectable } from '@angular/core';
import { InitialisedWeaviateConnection } from '../types/connection.type';

@Injectable({
  providedIn: 'root',
})
export class ConnectionManagerService {
  private connectionMap = new Map<number, InitialisedWeaviateConnection>();

  public constructor() {}

  public open(): void {
    go.main.App.ShowDialog();
  }
}
