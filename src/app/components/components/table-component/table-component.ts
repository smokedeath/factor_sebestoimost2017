import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'table-component',
    templateUrl: 'table-component.html',
    styleUrls: ['table-component.css']
})

export class MyTableComponent{    
    preloaderText = 'Подождите. Идет загрузка данных...';

    @Input()
    value = [];

    @Input()
    cols = [];

    @Input()
    tableFilter: Boolean;
}