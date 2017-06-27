import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    templateUrl: 'explotation-pokaz-sebestoimost.html',
    styleUrls: ['explotation-pokaz-sebestoimost.css']
})

export class ExplotationPokazSebestoimost implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ЭКСПЛУАТАЦИОННЫЕ ПОКАЗАТЕЛИ';
    userSetings;
    diction = [];

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    
}