import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'page-gp-date-input',
    templateUrl: 'page.gp.dateinput.html',
    styleUrls: ['page.gp.dateinput.css']
})

export class PageGpDateInput{
    menu = [
        {
            name: "Расходные измерители",
            subname: [
                {
                    name: "Фактические расходные измерители"
                },
                {
                    name: "Плановые расходные измерители"
                }
            ]
        },
        {
            name: "Эксплуатационные показатели",
            subname: [
                {
                    name: "Фактические статистические показатели"
                },
                {
                    name: "Плановые статистические показатели"
                }
            ]
        }
    ];

}