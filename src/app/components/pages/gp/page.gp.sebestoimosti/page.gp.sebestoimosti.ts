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
            sref: "notfound",
            subname: [
                {
                    name: "Расходы по номенклатуре",
                    sref: "rashodnomencl"
                },
                {
                    name: "Расходные измерители",
                    sref: "razhodizmer"
                },
                {
                    name: "Эксплуатационные показатели",
                    sref: "notfound"
                }
            ]
        },
        {
            name: "Промежуточные результаты расчетов",
            sref: "notfound",
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
            sref: "notfound",
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
            sref: "factconcseb",
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
        this.router.navigate(['gp.sebestoimosti/rashodnomencl']);
    } 

}