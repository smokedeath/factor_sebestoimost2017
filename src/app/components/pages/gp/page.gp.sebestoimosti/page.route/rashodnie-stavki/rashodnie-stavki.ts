import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'rashodnie-stavki',
    templateUrl: 'rashodnie-stavki.html',
    styleUrls: ['rashodnie-stavki.css']
})

export class RashodnieStavkiComponent implements OnInit{    
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'РАСХОДНЫЕ СТАВКИ';
    dopFiltr = false;
    diction = [];
    userSetings;

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
    }
}