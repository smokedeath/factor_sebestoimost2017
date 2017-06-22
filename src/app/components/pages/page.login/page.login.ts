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
    
    langId: any;
    diction: any;
    breadcrumb = [];
    logoName = '';

    navbarLevel = 0;     
    
    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[0][this.langId];
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
    }

}