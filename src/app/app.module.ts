import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MdTabsModule, MdInputModule, MdIconModule } from '@angular/material';
import "hammerjs";

import { AppComponent, IconComponent } from './app.component';
import { Apiv1Service } from './apiv1.service';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    MdTabsModule,
    MdInputModule,
    MdIconModule
  ],
  providers: [Apiv1Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
