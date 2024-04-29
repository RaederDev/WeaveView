import { Component, inject, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ConnectionManagerService } from './services/connection-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private connectionManagerService = inject(ConnectionManagerService);
  private translate = inject(TranslateService);

  public ngOnInit(): void {
    this.connectionManagerService.loadConnections();
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang(this.translate.langs[0]);
  }

  public updateLanguage(event: Event): void {
    const elem = event.target as HTMLSelectElement;
    this.translate.use(elem.value);
  }
}
