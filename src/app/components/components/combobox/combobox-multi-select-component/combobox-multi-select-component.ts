import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from './../../../../share/interface.service';

@Component({
    moduleId: module.id,
    selector: 'combobox-multi-select-component',
    templateUrl: 'combobox-multi-select-component.html',
    styleUrls: ['combobox-multi-select-component.css']
})


export class ComboboxMultiSelectComponent{
    @Input()
    selectModel: string[];

    @Input()
    option: SelectItem[];

    @Input()
    defaultLabel: String;

    @Output()
    updateTableColumns: EventEmitter<any> = new EventEmitter();

    selectItem(value){
        // console.log(value);
        this.updateTableColumns.emit(value);
    }
}