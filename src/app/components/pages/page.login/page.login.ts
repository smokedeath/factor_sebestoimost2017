import { Component, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'pagelogin',
    templateUrl: 'page.login.html',
    styleUrls: ['page.login.css']
})

export class PageLogin implements OnInit{
    constructor(private dictionary : Dictionary,
                private storage : LocalStorageService){}
    
    langId: Number;
    logoName = '../assets/admin/layout5/img/logo.png';

    getDiction(id: any, lang: Number){
        return this.dictionary.getDictionById(id, lang);
    };


    // logoName =  this.dictionary.getDictionById(108,this.langId);
    navbarLevel = 0;     
    lo: String = this.logoName;

    ngOnInit(){
        this.langId = this.storage.retrieve('langId');
        if (this.langId==0 || this.langId == null){
            this.langId = 1;            
            this.storage.store('langId', this.langId);
        }

    }

}