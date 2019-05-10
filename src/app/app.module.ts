import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TextService, ControlPanelService, SynonymsService } from './services';

import {
  AppComponent,
  ControlPanelComponent,
  HeaderComponent,
  TextEditorComponent,
  FooterComponent,
  SynonymsComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    HeaderComponent,
    FooterComponent,
    TextEditorComponent,
    SynonymsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ContextMenuModule.forRoot()
  ],
  providers: [
    TextService,
    ControlPanelService,
    SynonymsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
