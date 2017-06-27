import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'explotation-pokaz-rashodstavok',
    templateUrl: 'explotation-pokaz-rashodstavok.html',
    styleUrls: ['explotation-pokaz-rashodstavok.css']
})

export class ExplotationPokazRashodStavokComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ЭКСПЛУАТАЦИОННЫЕ ПОКАЗАТЕЛИ';  
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