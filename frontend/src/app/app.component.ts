import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang(this.translate.langs[0]);
  }

  public updateLanguage(event: Event): void {
    const elem = event.target as HTMLSelectElement;
    this.translate.use(elem.value);
  }
}
