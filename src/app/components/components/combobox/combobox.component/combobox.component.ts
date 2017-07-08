import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'combobox-component',
    templateUrl: 'combobox.component.html',
    styleUrls: ['combobox.component.css']
})

export class ComboboxComponent{ 
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