import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';

@Component({
    moduleId: module.id,
    selector: 'not-found',
    templateUrl: 'not-found.html',
    styleUrls: ['not-found.css']
})

export class NotFountComponent implements OnInit{
    constructor(private dictionary : Dictionary) {}
    @Input()
    langId: any = 0;

    diction = [];

    
    updIdLang(idLang){
        this.langId = idLang;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.updIdLang(this.langId);
    }

}