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
    smallMenu = [];   
    userSetings; 

    menu = []; 

    updIdLang(idLang){
        this.userSetings.langId = idLang;
        this.logoName = this.diction[1][this.userSetings.langId];        
        this.smallMenu = this.service.getSmalMenuGP(this.userSetings.langId);  

        this.menu = [
                {
                    name: this.diction[68][this.userSetings.langId],
                    sref: "rashodi",
                    subname: []
                },
                {
                    name: this.diction[13][this.userSetings.langId],
                    sref: "explpokaz",
                    subname: []
                },
                {
                    name:  this.diction[121][this.userSetings.langId],
                    sref: "otnesenierashodov",
                    subname: []
                },
                {
                    name: this.diction[5][this.userSetings.langId],
                    sref: "rashodstavok",
                    subname: []
                }
            ]; 
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
        this.curentMenuItem = 'rashodstavok';
        this.router.navigate(['gp.rashodstavok/rashodstavok']);
    }

}