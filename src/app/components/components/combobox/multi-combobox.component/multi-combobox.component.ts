import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'multi-combobox-component',
    templateUrl: 'multi-combobox.component.html',
    styleUrls: ['multi-combobox.component.css']
})

export class MultiComboboxComponent{ 
    @Input()
    structure: any;
     
    @Input()
    iNgModel: any;
}