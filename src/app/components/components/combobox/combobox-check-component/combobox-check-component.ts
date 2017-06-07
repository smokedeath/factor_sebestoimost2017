import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'combobox-check-component',
    templateUrl: 'combobox-check-component.html',
    styleUrls: ['combobox-check-component.css']
})

export class ComboboxCheckComponent{
    @Input()
    structure: any;
}