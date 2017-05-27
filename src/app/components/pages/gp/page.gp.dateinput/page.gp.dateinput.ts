import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'page-gp-date-input',
    templateUrl: 'page.gp.dateinput.html',
    styleUrls: ['page.gp.dateinput.css']
})

export class PageGpDateInput implements OnInit{
    constructor(private router: Router) {}

    menu = [
        {
            name: "Загрузка финансовых данных",
            subname: [],
            sref: "findatainput"
        },
        {
            name: "Загрузка данных из ЕК ИОДВ",
            subname: [],
            sref: "notfound"
        },
        {
            name: "Загрузка данных из АСУ ДКР",
            subname: [],
            sref: "notfound"
        },
        {
            name: "Загрузка данных из Ц Расчет",
            subname: [],
            sref: "notfound"
        },
        {
            name: "Загрузка статистических показателей",
            subname: [],
            sref: "sap"
        }
    ];

    ngOnInit(){
        this.router.navigate(["gp.date.input/findatainput"]);
    }   

    selectRout(){
        this.router.navigate(["/gp.date.input/sap"]);
    }

}