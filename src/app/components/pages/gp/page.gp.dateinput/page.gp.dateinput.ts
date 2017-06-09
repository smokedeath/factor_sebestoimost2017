import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'page-gp-date-input',
    templateUrl: 'page.gp.dateinput.html',
    styleUrls: ['page.gp.dateinput.css']
})

export class PageGpDateInput implements OnInit{
    constructor(private router: Router,
                private service : AppService) {}

    logoName = '../assets/admin/layout5/img/logo_gp_new.png';
    rExitLink = '/index.gp';
    navbarLevel = 2;
    smallMenu = this.service.smallMenuGp;  

    menu = [
        {
            name: "Загрузка финансовых данных",
            subname: [],
            sref: "findatainput"
        },
        {
            name: "Загрузка данных из ЕК ИОДВ",
            subname: [],
            sref: "iodv"
        },
        {
            name: "Загрузка данных из АСУ ДКР",
            subname: [],
            sref: "asudkr"
        },
        {
            name: "Загрузка данных из Ц Расчет",
            subname: [],
            sref: "craschet"
        },
        {
            name: "Загрузка статистических показателей",
            subname: [],
            sref: "statpokazinput"
        }
    ];

    ngOnInit(){
        this.router.navigate(["gp.date.input/findatainput"]);
    }   

    selectRout(){
        this.router.navigate(["/gp.date.input/sap"]);
    }

}