import { Routes } from "@angular/router";
import { IndexPage, FreightTransportation } from './components/components.index'; 


export const routes: Routes = [    
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: IndexPage },
    { path: "ft", component: FreightTransportation },
]