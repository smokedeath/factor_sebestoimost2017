import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'page-gp-rashodstavok',
    templateUrl: 'page.gp.rashodstavok.html',
    styleUrls: ['page.gp.rashodstavok.css']
})

export class PageGpRashodStavok{
    
    menu = [
        {
            name: "Алгоритмы отнесения",
            subname: [
                {
                    name: "Деление на зависящие и условно-постоянные части",
                    sref: ""
                },
                {
                    name: "Расчет полных расходов по расходным измерителям",
                    sref: ""
                }
            ]
        },
        {
            name: "Алгоритмы расчета расходных ставок (фактических)",
            subname: [
                {
                    name: "Расчет зависящих и условно-постоянных расходных ставок",
                    sref: ""
                },
                {
                    name: "Расчет полных расходных ставок",
                    sref: ""
                }
            ]
        },
        {
            name: "Алгоритмы расчета расходных ставок (плановых)",
            subname: [
                {
                    name: "Расчет зависящих и условно-постоянных расходных ставок",
                    sref: ""
                },
                {
                    name: "Расчет полных расходных ставок",
                    sref: ""
                }
            ]
        }
    ]; 

}