import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'page-gp-rashodstavok',
    templateUrl: 'page.gp.rashodstavok.html',
    styleUrls: ['page.gp.rashodstavok.css']
})

export class PageGpRashodStavok implements OnInit{          
    constructor(private router: Router,
                private service : AppService) {} 

    logoName = '../assets/admin/layout5/img/logo_gp_new.png';
    rExitLink = '/index.gp';
    navbarLevel = 2;
    smallMenu = this.service.smallMenuGp;   

    menu = [
        {
            name: "Расходы",
            sref: "notfound",
            subname: []
        },
        {
            name: "Эксплуатационные показатели",
            sref: "notfound",
            subname: []
        },
        {
            name: "Отнесение расходов",
            sref: "notfound",
            subname: []
        },
        {
            name: "Расчет расходных ставок",
            sref: "rashodstavok",
            subname: []
        }
    ]; 

    ngOnInit(){
        this.router.navigate(['gp.rashodstavok/rashodstavok']);
    }

}