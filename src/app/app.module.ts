import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

//LeafletModule
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

//Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';

// primeng imports
import {TreeTableModule, SharedModule, TreeTable, GrowlModule, ToggleButtonModule,
        CalendarModule, CheckboxModule, OverlayPanelModule, DialogModule, PanelModule, 
        DataTableModule, MultiSelectModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, NotFountComponent,
         PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti }  from './components/pages/pages.index';
import { ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, TreeTableComponent,
         SinglTopMenu , ErrorFormDate, ComboboxStructureKtzh, LefletMap, CalendarComponent, 
         MultiComboboxComponent, SidenavFTComponent, PassRefDialogComponent, NavbarMegaMenuComponent, 
         SidenavLinkMenuComponent, PreloaderComponent, ViewPositionCcomponent, UserSettingsComponent,
         ComboboxCheckComponent, MyTableComponent } from './components/components/components.index';

import { FactConcSebistoimostView, RazhodPoNomenclature, RazhodnieIzmeriteli } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';   
import { ViewGpSap, FinanceDataInput, IodvDataInput, StatPokazInputComponent,
         AsudkrDataInputComponent } from './components/pages/gp/page.gp.dateinput/page.route/view.index';   

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './share/app.service';

@NgModule({
  declarations: [AppComponent, 
                PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, 
                PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti, //Основные страницы

                ViewGpSap, FactConcSebistoimostView, NotFountComponent, FinanceDataInput, AsudkrDataInputComponent,
                IodvDataInput, StatPokazInputComponent, RazhodPoNomenclature, RazhodnieIzmeriteli, // View основных страниц

                ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, CalendarComponent, SidenavFTComponent,
                SinglTopMenu, ErrorFormDate, ComboboxStructureKtzh, LefletMap, TreeTableComponent, MultiComboboxComponent,
                PassRefDialogComponent, NavbarMegaMenuComponent, SidenavLinkMenuComponent, PreloaderComponent, 
                ViewPositionCcomponent, UserSettingsComponent, ComboboxCheckComponent , MyTableComponent// Общие компоненты
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
    LeafletModule, 
    TreeTableModule, SharedModule, GrowlModule, CalendarModule, CheckboxModule, OverlayPanelModule, DialogModule, 
                     ToggleButtonModule, PanelModule, DataTableModule, MultiSelectModule
  ],
  entryComponents: [
    ErrorDialog
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
