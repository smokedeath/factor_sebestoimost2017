import { Component, Input, Output, OnInit } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';

@Component({
    moduleId: module.id,
    selector: 'panel-filter-component',
    templateUrl: 'panel-filter-component.html',
    styleUrls: ['panel-filter-component.css']
})

export class PanelFilterComponent implements OnInit{
    constructor(private dictionary : Dictionary){};

    @Input() langId: Number = 0;
    @Input() tableDateOptionsFilter = [];

    tableDateOptionsFilterModel: Number;
    diction = [];    
    param = '';


    ngOnInit() {
        this.diction = this.dictionary.dictionary;        
    }
} 