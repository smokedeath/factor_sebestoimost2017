import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'tree-table',
    templateUrl: 'tree-table.html',
    styleUrls: ['tree-table.css']
})

export class TreeTableComponent {                  
    selectedField: any;  

    @Input()
    tableDate = [];  

    @Input()
    tableDateColumns = [];
}