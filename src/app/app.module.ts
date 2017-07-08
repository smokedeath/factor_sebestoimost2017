import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { Md5 } from 'ts-md5/dist/md5';

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
         SinglTopMenu , ErrorFormDate, LefletMap, CalendarComponent, FooterComponent, 
         SidenavFTComponent, PassRefDialogComponent, NavbarMegaMenuComponent, 
         SidenavLinkMenuComponent, PreloaderComponent, ViewPositionCcomponent, UserSettingsComponent,
         MyTableComponent, ComboboxMultiSelectComponent, BreadCrumbComponent, TreeTableSettingsComponent } from './components/components/components.index';

import { FactConcSebistoimostView, RazhodnieIzmeriteli, RashodnieStavkiComponent, AllParametrsViewComponent,
         ExplotationPokazSebestoimost, FactSrednSebeStoimostComponent, 
         ViborMarschrutaViewComponent } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';   
import { FinanceDataInput, IodvDataInput, StatPokazInputComponent,
         AsudkrDataInputComponent, CraschetDataInputComponent } from './components/pages/gp/page.gp.dateinput/page.route/view.index'; 
import { RashodStavokComponent, OtnesenieRashodovComponent, ZavOtnesenieRashodovComponent,
         ExplotationPokazRashodStavokComponent, RashodiComponent, UslOtnesenieRashodovComponent,
         FullOtnesenieRashodovComponent, ZavRashodStavokComponent, UslRashodStavokComponent, 
         FullRashodStavokComponent } from './components/pages/gp/page.gp.rashodstavok/page.route/view.index';  

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

                FactConcSebistoimostView, NotFountComponent, FinanceDataInput, AsudkrDataInputComponent,
                IodvDataInput, StatPokazInputComponent, RazhodnieIzmeriteli, CraschetDataInputComponent, RashodnieStavkiComponent,
                RashodStavokComponent, RaskodStavokTemplateComponent, OtnesenieRashodovComponent, ExplotationPokazRashodStavokComponent,
                RashodiComponent,  ExplotationPokazSebestoimost, ExplotationPokazTemplateComponent, ViborMarschrutaViewComponent,
                RaskodstavokTemplateSebistoimostComponent, FactSrednSebeStoimostComponent, AllParametrsViewComponent,
                ZavOtnesenieRashodovComponent, UslOtnesenieRashodovComponent, FullOtnesenieRashodovComponent, 
                ZavRashodStavokComponent, UslRashodStavokComponent, FullRashodStavokComponent, // View основных страниц

                ComponentLogin, ErrorDialog, ComponentBigBatton, ComboboxComponent, CalendarComponent, SidenavFTComponent,
                SinglTopMenu, ErrorFormDate, LefletMap, TreeTableComponent, 
                PassRefDialogComponent, NavbarMegaMenuComponent, SidenavLinkMenuComponent, PreloaderComponent, 
                ViewPositionCcomponent, UserSettingsComponent, MyTableComponent, 
                ComboboxMultiSelectComponent, BreadCrumbComponent, FooterComponent, TreeTableSettingsComponent // Общие компоненты
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
  providers: [AppService, Dictionary, BreadcrumbService, Md5],
  bootstrap: [AppComponent]
})
export class AppModule { }
