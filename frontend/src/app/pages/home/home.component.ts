import { Component } from '@angular/core';

import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public constructor(private dialogService: DialogService) {}

  public openDialog(): void {
    this.dialogService.open();
  }
}
