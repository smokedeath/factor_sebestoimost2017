import { Component, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'pagelogin',
    templateUrl: 'page.login.html',
    styleUrls: ['page.login.css']
})

export class PageLogin implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}    

    diction: any;
    breadcrumb = [];
    logoName = '';
    userSetings;
    navbarLevel = 0;     
    
    updIdLang(idLang){
        this.userSetings.langId = idLang;
        this.logoName = this.diction[0][this.userSetings.langId];
    }
    ngOnInit(){
        this.diction = this.dictionary.dictionary;    
        this.userSetings = this.storage.retrieve('UserSetings');    
        if (this.userSetings == null) {
            this.storage.store('UserSetings', this.service.userSetings);
            this.userSetings = this.service.userSetings;
        }
        this.updIdLang(this.userSetings.langId);
    }
}