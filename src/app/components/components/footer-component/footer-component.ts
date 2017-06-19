import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';

@Component({
    moduleId: module.id,
    selector: 'footer-component',
    templateUrl: 'footer-component.html',
    styleUrls: ['footer-component.css']
})

export class FooterComponent implements OnInit{        
    constructor(private dictionary : Dictionary){}

    @Input()
    langId: any = 0;
    diction: any;

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
    }
}




