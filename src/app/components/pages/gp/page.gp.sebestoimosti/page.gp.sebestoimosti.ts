import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'page-gp-sebestoimosti',
    templateUrl: 'page.gp.sebestoimosti.html',
    styleUrls: ['page.gp.sebestoimosti.css']
})

export class PageGpSebestoimosti implements OnInit{       
    constructor(private router: Router,
                private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {} 

    logoName = '';
    rExitLink = '/index.gp';
    navbarLevel = 2;
    smallMenu = [];   
    curentMenuItem: String;
    diction = [];
    userSetings;

    menu = [];

    updIdLang(idLang){
        this.userSetings.langId = idLang;
        this.logoName = this.diction[1][this.userSetings.langId];        
        this.smallMenu = this.service.getSmalMenuGP(this.userSetings.langId);  
        this.menu = [
                {
                    name: this.diction[13][this.userSetings.langId],
                    sref: "explpokaz",
                    subname: []
                },
                {
                    name: this.diction[14][this.userSetings.langId],
                    sref: "razhodizmer",
                    subname: []
                },
                {
                    name: this.diction[15][this.userSetings.langId],
                    sref: "rashodniestavki",
                    subname: []
                },
                {
                    name: this.diction[16][this.userSetings.langId],
                    sref: "factsrednseb",
                    subname: []
                },
                {
                    name: this.diction[17][this.userSetings.langId],
                    sref: "factconcseb",  
                    subname: []
                }
            ];
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
        this.curentMenuItem = 'factsrednseb';
        this.router.navigate(['gp.sebestoimosti/factsrednseb']);
    } 

}