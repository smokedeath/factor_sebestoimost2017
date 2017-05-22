import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'page-gp-date-input',
    templateUrl: 'page.gp.dateinput.html',
    styleUrls: ['page.gp.dateinput.css']
})

export class PageGpDateInput{
    constructor(
        private router: Router) {}

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

    selectRout(){
        this.router.navigate(["/gp.date.input/sap"]);
        // routerLink="/gp.date.input/sap" routerLinkActive="active"
    }

}