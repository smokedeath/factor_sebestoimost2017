import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'page-gp-rashodstavok',
    templateUrl: 'page.gp.rashodstavok.html',
    styleUrls: ['page.gp.rashodstavok.css']
})

export class PageGpRashodStavok implements OnInit{          
    constructor(private router: Router) {} 

    menu = [
        {
            name: "Алгоритмы отнесения",
            sref: "notfound",
            subname: [
                {
                    name: "Деление на зависящие и условно-постоянные части",
                    sref: "notfound"
                },
                {
                    name: "Расчет полных расходов по расходным измерителям",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Алгоритмы расчета расходных ставок (фактических)",
            sref: "notfound",
            subname: [
                {
                    name: "Расчет зависящих и условно-постоянных расходных ставок",
                    sref: "notfound"
                },
                {
                    name: "Расчет полных расходных ставок",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Алгоритмы расчета расходных ставок (плановых)",
            sref: "notfound",
            subname: [
                {
                    name: "Расчет зависящих и условно-постоянных расходных ставок",
                    sref: "notfound"
                },
                {
                    name: "Расчет полных расходных ставок",
                    sref: "notfound"
                }
            ]
        }
    ]; 

    ngOnInit(){
        this.router.navigate(['gp.rashodstavok/notfound']);
    }

}