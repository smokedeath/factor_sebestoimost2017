import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SelectModule } from 'angular2-select';

//LeafletModule
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

//Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, NotFountComponent,
         PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti }  from './components/pages/pages.index';
import { ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent,
         SinglTopMenu , ErrorFormDate, ComboboxStructureKtzh, LefletMap} from './components/components/components.index';

import { FactConcSebistoimostView } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';   
import { ViewGpSap, FinanceDataInput } from './components/pages/gp/page.gp.dateinput/page.route/view.index';   

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './share/app.service';

@NgModule({
  declarations: [AppComponent,
                PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, 
                PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti, //Основные страницы
                ViewGpSap, FactConcSebistoimostView, NotFountComponent, FinanceDataInput, // View основных страниц

                ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, 
                SinglTopMenu, ErrorFormDate, ComboboxStructureKtzh, LefletMap// Общие компоненты
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    JsonpModule,
    AppRoutingModule,
    SelectModule,
    LeafletModule
  ],
  entryComponents: [
    ErrorDialog
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
