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
    curentMenuItem: String;

    menu = [
        {
            name: "Расходы",
            sref: "rashodi",
            subname: []
        },
        {
            name: "Эксплуатационные показатели",
            sref: "explpokaz",
            subname: []
        },
        {
            name: "Отнесение расходов",
            sref: "otnesenierashodov",
            subname: []
        },
        {
            name: "Расчет расходных ставок",
            sref: "rashodstavok",
            subname: []
        }
    ]; 

    ngOnInit(){
        this.curentMenuItem = 'rashodstavok';
        this.router.navigate(['gp.rashodstavok/rashodstavok']);
    }

}