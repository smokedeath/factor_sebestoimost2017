import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'page-gp-date-input',
    templateUrl: 'page.gp.dateinput.html',
    styleUrls: ['page.gp.dateinput.css']
})

export class PageGpDateInput implements OnInit{
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
                    name: this.diction[75][this.userSetings.langId],
                    subname: [],
                    sref: "findatainput"
                },
                {
                    name: this.diction[76][this.userSetings.langId],
                    subname: [],
                    sref: "iodv"
                },
                {
                    name: this.diction[77][this.userSetings.langId],
                    subname: [],
                    sref: "asudkr"
                },
                {
                    name: this.diction[78][this.userSetings.langId],
                    subname: [],
                    sref: "craschet"
                },
                {
                    name: this.diction[79][this.userSetings.langId],
                    subname: [],
                    sref: "statpokazinput"
                }
            ];
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
        this.curentMenuItem = 'findatainput';
        this.router.navigate(["gp.date.input/findatainput"]);
    }   

}