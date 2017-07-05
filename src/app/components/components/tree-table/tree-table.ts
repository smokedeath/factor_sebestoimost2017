import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';

@Component({
    moduleId: module.id,
    selector: 'tree-table',
    templateUrl: 'tree-table.html',
    styleUrls: ['tree-table.css']
})

export class TreeTableComponent {       
    constructor(private dictionary : Dictionary){}              
    selectedField: any;   

    @Input() tableDate = [];  
    @Input() tableDateColumns = [];
    @Input() langId: any = 0;
    @Output() addChild: EventEmitter<any> = new EventEmitter();

    diction: any;
    loadNode(event) {
        if(event.node.leaf==false) {
            this.addChild.emit(event.node);
        }
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
    }
    
}