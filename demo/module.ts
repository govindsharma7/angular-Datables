import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxDatatableModule } from '../src';
import { AppComponent } from './app.component';

// import { NgxSmartModalModule } from '../src/ngx-smart-modal';

import { CustomCheckboxSelectionComponent } from './selection/selection-chkbox-template.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCheckboxSelectionComponent
  ],
  imports: [BrowserModule, NgxDatatableModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
