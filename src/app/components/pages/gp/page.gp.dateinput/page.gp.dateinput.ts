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
            name: "Загрузка данных SAP",
            subname: []
        },
        {
            name: "Загрузка данных из ЕК ИОДВ",
            subname: []
        },
        {
            name: "Загрузка данных из АСУ ДКР",
            subname: []
        },
        {
            name: "Загрузка данных из Ц Расчет",
            subname: []
        },
        {
            name: "Загрузка статистических показателей",
            subname: []
        }
    ];

}