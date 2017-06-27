import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: "page-gp-analiz",
    templateUrl: "page.gp.analiz.html",
    styleUrls: ['page.gp.analiz.css']
})

export class PageGpAnaliz implements OnInit{
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
                name: this.diction[122][this.userSetings.langId],
                subname: [],
                sref: "notfound"
            },
            {
                name: this.diction[123][this.userSetings.langId],
                subname: [],
                sref: "notfound"
            }
        ];
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
        this.curentMenuItem = 'notfound';
        this.router.navigate(["gp.analiz/notfound"]);
    }  
}