import { Routes } from "@angular/router";
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput, 
         PageGpRashodStavok, PageGpSebestoimosti, PageGpAnaliz } from './components/pages/pages.index'; 

export const routes: Routes = [    
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: PageLogin },
    { path: "index.gp", component: PageIndexGp },
    { path: "index.mzhs", component: PageIndexMzhs},
    { path: "gp.date.input", component: PageGpDateInput },
    { path: "gp.rashodstavok", component: PageGpRashodStavok },
    { path: "gp.sebestoimosti", component: PageGpSebestoimosti },
    { path: "gp.analiz", component: PageGpAnaliz }
]