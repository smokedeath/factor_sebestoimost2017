import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "page-gp-analiz",
    templateUrl: "page.gp.analiz.html",
    styleUrls: ['page.gp.analiz.css']
})

export class PageGpAnaliz{
    
    menu = [
        {
            name: "Анализ себестоимости",
            subname: []
        },
        {
            name: "Анализ расходов",
            subname: []
        }
    ];


}