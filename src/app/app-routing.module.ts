import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput, 
         PageGpRashodStavok, PageGpSebestoimosti, PageGpAnaliz } from './components/pages/pages.index'; 

import { ViewGpSap } from './components/pages/gp/page.gp.dateinput/page.route/view.index';
import { FactConcSebistoimostView } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';

@NgModule({
    imports: [RouterModule.forRoot([            
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: PageLogin },
            { path: "index.gp", component: PageIndexGp },
            { path: "index.mzhs", component: PageIndexMzhs },
            { path: "gp.date.input", component: PageGpDateInput, 
                    children: [
                        { path: "sap", component: ViewGpSap }
                    ] 
            },
            { path: "gp.rashodstavok", component: PageGpRashodStavok },
            { path: "gp.sebestoimosti", component: PageGpSebestoimosti,
                    children: [
                        { path: "factconcseb", component:  FactConcSebistoimostView}
                    ]
            },
            { path: "gp.analiz", component: PageGpAnaliz }
        ])],
        exports: [RouterModule]
})

export class AppRoutingModule {}