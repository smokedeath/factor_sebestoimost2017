import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'fact-conc-sebistoimost',
    templateUrl: 'factConcSebistoimost.html',
    styleUrls: ['factConcSebistoimost.css']
})

export class FactConcSebistoimostView implements OnInit{
    constructor(private service: AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}
    
    titelName = 'РАСЧЕТ КОНКРЕТНОЙ СЕБЕСТОИМОСТИ';  
    activTabPanel = 0; 
    diction = []; 
    userSetings;

   handleChange(e) {
        this.activTabPanel = e.index;
   }

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
    }

}