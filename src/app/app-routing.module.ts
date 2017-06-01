import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput, NotFountComponent,
         PageGpRashodStavok, PageGpSebestoimosti, PageGpAnaliz } from './components/pages/pages.index'; 

import { ViewGpSap, FinanceDataInput, IodvDataInput, StatPokazInputComponent } from './components/pages/gp/page.gp.dateinput/page.route/view.index';
import { FactConcSebistoimostView, RazhodPoNomenclature, RazhodnieIzmeriteli } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';

@NgModule({
    imports: [RouterModule.forRoot([            
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: PageLogin },
            { path: "index.gp", component: PageIndexGp },
            { path: "index.mzhs", component: PageIndexMzhs },
            { path: "gp.date.input", component: PageGpDateInput, 
                    children: [                        
                        { path: "notfound", component: NotFountComponent },
                        { path: "findatainput", component: FinanceDataInput },
                        { path: "iodv", component: IodvDataInput }, 
                        { path: "statpokazinput", component: StatPokazInputComponent},
                        { path: "sap", component: ViewGpSap }
                    ] 
            },
            { path: "gp.rashodstavok", component: PageGpRashodStavok,
                    children: [     
                        { path: "notfound", component: NotFountComponent }
                    ]
            },
            { path: "gp.sebestoimosti", component: PageGpSebestoimosti,
                    children: [                        
                        { path: "notfound", component: NotFountComponent },
                        { path: "factconcseb", component:  FactConcSebistoimostView},
                        { path: "rashodnomencl", component: RazhodPoNomenclature },
                        { path: "razhodizmer", component: RazhodnieIzmeriteli }
                    ]
            },
            { path: "gp.analiz", component: PageGpAnaliz,
                    children: [     
                        { path: "notfound", component: NotFountComponent }
                    ]
            }
        ])],
        exports: [RouterModule]
})

export class AppRoutingModule {}