import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'page-gp-sebestoimosti',
    templateUrl: 'page.gp.sebestoimosti.html',
    styleUrls: ['page.gp.sebestoimosti.css']
})

export class PageGpSebestoimosti{    
    menu = [
        {
            name: "Исходные данные",
            subname: [
                {
                    name: "Расходы по номенклатуре",
                    sref: ""
                },
                {
                    name: "Расходные измерители",
                    sref: ""
                },
                {
                    name: "Эксплуатационные показатели",
                    sref: ""
                }
            ]
        },
        {
            name: "Промежуточные результаты расчетов",
            subname: [
                {
                    name: "Отнесение статей расходов по РИ",
                    sref: ""
                },
                {
                    name: "Расходы по расходным измерителям",
                    sref: ""
                },
                {
                    name: "Расходные ставки",
                    sref: ""
                }
            ]
        },
        {
            name: "Расчет средней себестоимости",
            subname: [
                {
                    name: "Расчет фактической средней себестоимости",
                    sref: ""
                },
                {
                    name: "Расчет плановой средней себестоимости",
                    sref: ""
                }
            ]
        },
        {
            name: "Расчет конкретной себестоимости",
            subname: [
                {
                    name: "Расчет фактической конкретной себестоимости",
                    sref: ""
                },
                {
                    name: "Расчет плановой конкретной себестоимости",
                    sref: ""
                }
            ]
        }
    ]; 

}