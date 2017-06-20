import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'rashodnie-izmeriteli',
    templateUrl: 'rashodnie-izmeriteli.html',
    styleUrls: ['rashodnie-izmeriteli.css']

})

export class RazhodnieIzmeriteli implements OnInit{   
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'РАСХОДЫ ПО РАСХОДНЫМ ИЗМЕРИТЕЛЯМ'; 
    langId = 0;
    diction = [];

    updateIdLang(){
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
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
    }

}