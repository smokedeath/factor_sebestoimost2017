import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'page-gp-rashodstavok',
    templateUrl: 'page.gp.rashodstavok.html',
    styleUrls: ['page.gp.rashodstavok.css']
})

export class PageGpRashodStavok implements OnInit{          
    constructor(private router: Router,
                private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {} 

    logoName = '';
    rExitLink = '/index.gp';
    navbarLevel = 2;
    curentMenuItem: String;
    diction = [];
    langId: any = 0;
    smallMenu = [];    

    menu = []; 

    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[1][this.langId];        
        this.smallMenu = this.service.getSmalMenuGP(this.langId);  

        this.menu = [
                {
                    name: this.diction[86][this.langId],
                    sref: "rashodi",
                    subname: []
                },
                {
                    name: this.diction[13][this.langId],
                    sref: "explpokaz",
                    subname: []
                },
                {
                    name:  this.diction[121][this.langId],
                    sref: "otnesenierashodov",
                    subname: []
                },
                {
                    name: this.diction[5][this.langId],
                    sref: "rashodstavok",
                    subname: []
                }
            ]; 
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
        if (this.langId == null){
            this.langId = 0;            
            this.storage.store('langId', this.langId);
        }
        this.updIdLang(this.langId);
        this.curentMenuItem = 'rashodstavok';
        this.router.navigate(['gp.rashodstavok/rashodstavok']);
    }

}