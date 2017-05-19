import { Routes } from "@angular/router";
import { PageLogin } from './components/pages/index'; 


export const routes: Routes = [    
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: PageLogin },
    // { path: "ft", component: FreightTransportation },
]