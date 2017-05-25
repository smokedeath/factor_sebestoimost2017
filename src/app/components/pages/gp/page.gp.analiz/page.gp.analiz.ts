import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "page-gp-analiz",
    templateUrl: "page.gp.analiz.html",
    styleUrls: ['page.gp.analiz.css']
})

export class PageGpAnaliz implements OnInit{
    constructor(private router: Router) {}
    
    menu = [
        {
            name: "Анализ себестоимости",
            subname: [],
            sref: "notfound"
        },
        {
            name: "Анализ расходов",
            subname: [],
            sref: "notfound"
        }
    ];

    ngOnInit(){
        this.router.navigate(["gp.analiz/notfound"]);
    }  


}