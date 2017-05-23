import { Component, Input } from '@angular/core';

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
}