import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput, NotFountComponent,
         PageGpRashodStavok, PageGpSebestoimosti, PageGpAnaliz, FaqComponent } from './components/pages/pages.index'; 

import { ViewGpSap, FinanceDataInput, IodvDataInput, StatPokazInputComponent, 
         AsudkrDataInputComponent, CraschetDataInputComponent } from './components/pages/gp/page.gp.dateinput/page.route/view.index';
import { FactConcSebistoimostView, RazhodnieIzmeriteli, RashodnieStavkiComponent, 
         ExplotationPokazSebestoimost, FactSrednSebeStoimostComponent } from './components/pages/gp/page.gp.sebestoimosti/page.route/view.index';
import { RashodStavokComponent, OtnesenieRashodovComponent, 
         ExplotationPokazRashodStavokComponent, RashodiComponent } from './components/pages/gp/page.gp.rashodstavok/page.route/view.index';  

@NgModule({
    imports: [RouterModule.forRoot([            
            { path: "", redirectTo: "login", pathMatch: "full", data: { index: 0, cIndex: 0 }},
            { path: "login", component: PageLogin, data: { index: 0, cIndex: 0 }},
            { path: "sebestoimost_faq", component: FaqComponent, data: { index: 0, cIndex: 0 }},
            { path: "index.gp", component: PageIndexGp, data: { index: 1, cIndex: 0  }},
            { path: "index.mzhs", component: PageIndexMzhs, data: { index: 2, cIndex: 0  }},
            { path: "gp.date.input", component: PageGpDateInput, data: { index: 3, cIndex: 1 }, 
                    children: [                        
                        { path: "notfound", component: NotFountComponent, data: { index: 12, cIndex: 1 }},
                        { path: "findatainput", component: FinanceDataInput, data: { index: 75, cIndex: 1 }},
                        { path: "iodv", component: IodvDataInput, data: { index: 76, cIndex: 1 }}, 
                        { path: "statpokazinput", component: StatPokazInputComponent, data: { index: 79, cIndex: 1 }},
                        { path: "asudkr", component: AsudkrDataInputComponent, data: { index: 77, cIndex: 1 }},
                        { path: "craschet", component: CraschetDataInputComponent, data: { index: 78, cIndex: 1 }},
                        { path: "sap", component: ViewGpSap, data: { index: 0, cIndex: 1 }}
                    ] 
            },
            { path: "gp.rashodstavok", component: PageGpRashodStavok, data: { index: 5, cIndex: 1 },
                    children: [     
                        { path: "notfound", component: NotFountComponent, data: { index: 12, cIndex: 1 }},
                        { path: "rashodstavok", component: RashodStavokComponent, data: { index: 5, cIndex: 1 }},
                        { path: "otnesenierashodov", component: OtnesenieRashodovComponent, data: { index: 121, cIndex: 1 }},
                        { path: "explpokaz", component: ExplotationPokazRashodStavokComponent, data: { index: 13, cIndex: 1 }},
                        { path: "rashodi", component: RashodiComponent, data: { index: 68, cIndex: 1 }}
                    ]
            },
            { path: "gp.sebestoimosti", component: PageGpSebestoimosti, data: { index: 6, cIndex: 1 },
                    children: [                        
                        { path: "notfound", component: NotFountComponent, data: { index: 12, cIndex: 1 }},
                        { path: "explpokaz", component: ExplotationPokazSebestoimost, data: { index: 13, cIndex: 1 }},
                        { path: "razhodizmer", component: RazhodnieIzmeriteli, data: { index: 14, cIndex: 1 }},
                        { path: "rashodniestavki", component: RashodnieStavkiComponent, data: { index: 15, cIndex: 1 }},
                        { path: 'factsrednseb', component: FactSrednSebeStoimostComponent, data: { index: 16, cIndex: 1 }},
                        { path: "factconcseb", component:  FactConcSebistoimostView, data: { index: 17, cIndex: 1 }}
                    ]
            },
            { path: "gp.analiz", component: PageGpAnaliz, data: { index: 7, cIndex: 1 },
                    children: [     
                        { path: "notfound", component: NotFountComponent, data: { index: 12, cIndex: 1 }}
                    ]
            }
        ])],
        exports: [RouterModule]
})

export class AppRoutingModule {}