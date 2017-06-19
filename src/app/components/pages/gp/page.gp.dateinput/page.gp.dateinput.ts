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
    smallMenu = this.service.smallMenuGp;  
    curentMenuItem: String;
    diction = [];
    langId: any = 0;

    menu = [];

    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[1][this.langId];
        this.menu = [
                {
                    name: this.diction[75][this.langId],
                    subname: [],
                    sref: "findatainput"
                },
                {
                    name: this.diction[76][this.langId],
                    subname: [],
                    sref: "iodv"
                },
                {
                    name: this.diction[77][this.langId],
                    subname: [],
                    sref: "asudkr"
                },
                {
                    name: this.diction[78][this.langId],
                    subname: [],
                    sref: "craschet"
                },
                {
                    name: this.diction[79][this.langId],
                    subname: [],
                    sref: "statpokazinput"
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
        this.curentMenuItem = 'findatainput';
        this.router.navigate(["gp.date.input/findatainput"]);
    }   

}