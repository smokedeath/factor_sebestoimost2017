import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2Webstorage } from 'ngx-webstorage';

//LeafletModule
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';

//Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';

// primeng imports
import {TreeTableModule, SharedModule, TreeTable, GrowlModule, ToggleButtonModule, TreeModule, 
        CalendarModule, CheckboxModule, OverlayPanelModule, DialogModule, PanelModule, BreadcrumbModule,
        DataTableModule, MultiSelectModule, TabViewModule, TooltipModule, SpinnerModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, NotFountComponent,
         PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti, FaqComponent }  from './components/pages/pages.index';

import { ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, TreeTableComponent,
         SinglTopMenu , ErrorFormDate, ComboboxStructureKtzh, LefletMap, CalendarComponent, FooterComponent,
         MultiComboboxComponent, SidenavFTComponent, PassRefDialogComponent, NavbarMegaMenuComponent, 
         SidenavLinkMenuComponent, PreloaderComponent, ViewPositionCcomponent, UserSettingsComponent,
         ComboboxCheckComponent, MyTableComponent, ComboboxMultiSelectComponent, BreadCrumbComponent } from './components/components/components.index';

import { FactConcSebistoimostView, RazhodnieIzmeriteli, RashodnieStavkiComponent, AllParametrsViewComponent,
         ExplotationPokazSebestoimost, FactSrednSebeStoimostComponent, 
         ViborMarschrutaViewComponent } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';   
import { ViewGpSap, FinanceDataInput, IodvDataInput, StatPokazInputComponent,
         AsudkrDataInputComponent, CraschetDataInputComponent } from './components/pages/gp/page.gp.dateinput/page.route/view.index'; 
import { RashodStavokComponent, OtnesenieRashodovComponent, 
         ExplotationPokazRashodStavokComponent, RashodiComponent } from './components/pages/gp/page.gp.rashodstavok/page.route/view.index';  

import { RaskodStavokTemplateComponent, ExplotationPokazTemplateComponent,
         RaskodstavokTemplateSebistoimostComponent } from './components/pages/genera-views/view.index';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './share/app.service';
import { Dictionary } from './../assets/dictionary';
import { BreadcrumbService } from './share/breadcrumb.service';

@NgModule({
  declarations: [AppComponent, FaqComponent, 
                PageLogin, PageIndexGp, PageIndexMzhs, PageGpAnaliz, 
                PageGpDateInput, PageGpRashodStavok, PageGpSebestoimosti, //Основные страницы

                ViewGpSap, FactConcSebistoimostView, NotFountComponent, FinanceDataInput, AsudkrDataInputComponent,
                IodvDataInput, StatPokazInputComponent, RazhodnieIzmeriteli, CraschetDataInputComponent, RashodnieStavkiComponent,
                RashodStavokComponent, RaskodStavokTemplateComponent, OtnesenieRashodovComponent, ExplotationPokazRashodStavokComponent,
                RashodiComponent,  ExplotationPokazSebestoimost, ExplotationPokazTemplateComponent, ViborMarschrutaViewComponent,
                RaskodstavokTemplateSebistoimostComponent, FactSrednSebeStoimostComponent, AllParametrsViewComponent,  // View основных страниц

                ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, CalendarComponent, SidenavFTComponent,
                SinglTopMenu, ErrorFormDate, ComboboxStructureKtzh, LefletMap, TreeTableComponent, MultiComboboxComponent,
                PassRefDialogComponent, NavbarMegaMenuComponent, SidenavLinkMenuComponent, PreloaderComponent, 
                ViewPositionCcomponent, UserSettingsComponent, ComboboxCheckComponent , MyTableComponent, 
                ComboboxMultiSelectComponent, BreadCrumbComponent, FooterComponent // Общие компоненты
  ],
  imports: [
    Ng2Webstorage,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    JsonpModule,
    AppRoutingModule,
    LeafletModule, 
    SplitPaneModule,
    TreeTableModule, SharedModule, GrowlModule, CalendarModule, CheckboxModule, OverlayPanelModule, DialogModule, SpinnerModule, BreadcrumbModule,
                     ToggleButtonModule, PanelModule, DataTableModule, MultiSelectModule, TabViewModule, TooltipModule, TreeModule,                       
  ],
  entryComponents: [
    ErrorDialog
  ],
  providers: [AppService, Dictionary, BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
