import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { OverlayPanel } from 'primeng/primeng';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: "page-gp-analiz",
    templateUrl: "page.gp.analiz.html",
    styleUrls: ['page.gp.analiz.css']
})

export class PageGpAnaliz implements OnInit{
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
            name: "Анализ себестоимости",
            subname: [],
            sref: "notfound"
        },
        {
            name: "Анализ расходов",
            subname: [],
            sref: "notfound"
        }
    ];

    ngOnInit(){
        this.router.navigate(["gp.analiz/notfound"]);
    }  


}