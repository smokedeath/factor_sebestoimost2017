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