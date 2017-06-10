import { Component, Input } from '@angular/core';
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

    selectItem(){
        console.log(this.selectModel);
        console.log('---');
    }


}