import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from './../../../../share/app.service';
import { OverlayPanel } from 'primeng/primeng';

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
    currentUser = "Габбасов Марс Беккалиевич";
    navbarLevel = 2;
    smallMenu = this.service.smallMenuGp;  

    getPanel(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event); 
    }      

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