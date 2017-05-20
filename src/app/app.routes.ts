import { Routes } from "@angular/router";
import { PageLogin, PageIndexGp, PageIndexMzhs, PageGpDateInput } from './components/pages/pages.index'; 

export const routes: Routes = [    
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: PageLogin },
    { path: "index.gp", component: PageIndexGp },
    { path: "index.mzhs", component: PageIndexMzhs},
    { path: "gp.date.input", component: PageGpDateInput },
    // { path: "ft", component: FreightTransportation },
]