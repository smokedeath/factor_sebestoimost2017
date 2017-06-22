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
    langId: any = 0;

    menu = [];

    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[1][this.langId];        
        this.smallMenu = this.service.getSmalMenuGP(this.langId);  
        this.menu = [
                {
                    name: this.diction[13][this.langId],
                    sref: "explpokaz",
                    subname: []
                },
                {
                    name: this.diction[14][this.langId],
                    sref: "razhodizmer",
                    subname: []
                },
                {
                    name: this.diction[15][this.langId],
                    sref: "rashodniestavki",
                    subname: []
                },
                {
                    name: this.diction[16][this.langId],
                    sref: "factsrednseb",
                    subname: []
                },
                {
                    name: this.diction[17][this.langId],
                    sref: "factconcseb",  
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
        this.curentMenuItem = 'factsrednseb';
        this.router.navigate(['gp.sebestoimosti/factsrednseb']);
    } 

}