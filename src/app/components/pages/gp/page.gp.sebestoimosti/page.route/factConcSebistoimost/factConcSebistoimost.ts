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
    langId = 0;

   handleChange(e) {
        this.activTabPanel = e.index;
   }

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