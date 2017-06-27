import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'not-found',
    templateUrl: 'not-found.html',
    styleUrls: ['not-found.css']
})

export class NotFountComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}
    @Input()
    langId: any = 0;

    diction = [];
    userSetings;

    
    updIdLang(idLang){
        this.userSetings.langId = idLang;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
    }

}