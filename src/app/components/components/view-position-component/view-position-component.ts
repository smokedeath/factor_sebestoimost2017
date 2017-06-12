import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'view-position-component',
    templateUrl: 'view-position-component.html',
    styleUrls: ['view-position-component.css']
})

export class ViewPositionCcomponent{
    @Input()
    titelName: String;
    checked2: boolean = true;
}