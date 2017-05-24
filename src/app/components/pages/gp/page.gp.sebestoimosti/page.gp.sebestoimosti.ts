import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'page-gp-sebestoimosti',
    templateUrl: 'page.gp.sebestoimosti.html',
    styleUrls: ['page.gp.sebestoimosti.css']
})

export class PageGpSebestoimosti implements OnInit{       
    constructor(private router: Router) {} 

    menu = [
        {
            name: "Исходные данные",
            subname: [
                {
                    name: "Расходы по номенклатуре",
                    sref: "notfound"
                },
                {
                    name: "Расходные измерители",
                    sref: "notfound"
                },
                {
                    name: "Эксплуатационные показатели",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Промежуточные результаты расчетов",
            subname: [
                {
                    name: "Отнесение статей расходов по РИ",
                    sref: "notfound"
                },
                {
                    name: "Расходы по расходным измерителям",
                    sref: "notfound"
                },
                {
                    name: "Расходные ставки",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Расчет средней себестоимости",
            subname: [
                {
                    name: "Расчет фактической средней себестоимости",
                    sref: "notfound"
                },
                {
                    name: "Расчет плановой средней себестоимости",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Расчет конкретной себестоимости",
            subname: [
                {
                    name: "Расчет фактической конкретной себестоимости",
                    sref: "factconcseb"
                },
                {
                    name: "Расчет плановой конкретной себестоимости",
                    sref: "notfound"
                }
            ]
        }
    ];

    ngOnInit(){
        this.router.navigate(['gp.sebestoimosti/factconcseb']);
    } 

}