import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'bread-crumb-component',
    templateUrl: 'bread-crumb-component.html',
    styleUrls: ['bread-crumb-component.css']
})

export class BreadCrumbComponent{
    @Input()
    mitems = [];

    private items: MenuItem[];
    
    ngOnInit() {
        this.items = [];
        this.items.push({label:'Categories'});
        this.items.push({label:'Sports'});
        this.items.push({label:'Football'});
        this.items.push({label:'Countries'});
        this.items.push({label:'Spain'});
        this.items.push({label:'F.C. Barcelona'});
        this.items.push({label:'Squad'});
        this.items.push({label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'});
    }
}