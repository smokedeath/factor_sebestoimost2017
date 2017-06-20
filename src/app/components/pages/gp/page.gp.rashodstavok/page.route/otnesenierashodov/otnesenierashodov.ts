import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'otnesenierashodov',
    templateUrl: 'otnesenierashodov.html',
    styleUrls: ['otnesenierashodov.css']
})

export class OtnesenieRashodovComponent implements OnInit{     
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ОТНЕСЕНИЕ РАСХОДОВ';
    dopFiltr = false;
    diction = [];
    langId = 0;

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