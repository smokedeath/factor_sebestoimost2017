import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'page-gp-sebestoimosti',
    templateUrl: 'page.gp.sebestoimosti.html',
    styleUrls: ['page.gp.sebestoimosti.css']
})

export class PageGpSebestoimosti implements OnInit{       
    constructor(private router: Router,
                private service : AppService) {} 

    logoName = '../assets/admin/layout5/img/logo_gp_new.png';
    rExitLink = '/index.gp';
    navbarLevel = 2;
    smallMenu = this.service.smallMenuGp;   
    curentMenuItem: String;

    menu = [
        {
            name: "Эксплуатационные показатели",
            sref: "explpokaz",
            subname: []
        },
        {
            name: "Расходы по расходным измерителям",
            sref: "razhodizmer",
            subname: []
        },
        {
            name: "Расходные ставки",
            sref: "rashodniestavki",
            subname: []
        },
        {
            name: "Расчет средней себестоимости",
            sref: "notfound",
            subname: []
        },
        {
            name: "Расчет конкретной себестоимости",
            sref: "notfound",
            subname: []
        }
    ];

    ngOnInit(){
        this.curentMenuItem = 'explpokaz';
        this.router.navigate(['gp.sebestoimosti/explpokaz']);
    } 

}