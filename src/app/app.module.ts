import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

//Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput }  from './components/pages/pages.index';
import { ComponentLogin, ErrorDialog, ComponentBigBatton, SinglTopMenu } from './components/components/components.index';

import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent,
                PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput, //Основные страницы
                ComponentLogin, ErrorDialog, ComponentBigBatton, SinglTopMenu, // Общие компоненты
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    ErrorDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
