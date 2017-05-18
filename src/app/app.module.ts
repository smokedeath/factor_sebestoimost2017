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
import { IndexPage, FreightTransportation, LoginDialog } from './components/components.index'; 

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, 
    IndexPage, FreightTransportation, LoginDialog
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
    LoginDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
