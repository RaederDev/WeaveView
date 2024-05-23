import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { ConnectionTreeComponent } from './components/connection-tree/connection-tree.component';
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CreateConnectionComponent } from './components/create-connection-modal/create-connection.component';
import { EditConnectionFormComponent } from './components/edit-connection-form/edit-connection-form.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConnectionViewComponent } from './components/collection-view/connection-view.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectionTreeComponent,
    CreateConnectionComponent,
    EditConnectionFormComponent,
    FormErrorsComponent,
    ConnectionViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ButtonModule,
    TreeModule,
    SplitterModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    ContextMenuModule,
    TableModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
