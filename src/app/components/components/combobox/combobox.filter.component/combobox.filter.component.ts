import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'combobox-filter-component',
    templateUrl: 'combobox.filter.component.html',
    styleUrls: ['combobox.filter.component.css']
})

export class ComboboxFilterComponent{ 
    @Input()
    structure: any;
     
    @Input()
    iNgModel: any;

    @Input()
    style: any;
    
    @Input()
    idLang: Number = -1;

    @Output()    
    oNgModel: EventEmitter<Number> = new EventEmitter();

    onComboboxChenge(){
        this.oNgModel.emit(this.iNgModel);
    }
}