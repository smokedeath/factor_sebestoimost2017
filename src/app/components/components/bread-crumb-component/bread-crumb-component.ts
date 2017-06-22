import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Dictionary } from './../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { Breadcrumb, BreadcrumbService } from './../../../share/breadcrumb.service';

@Component({
    moduleId: module.id,
    selector: 'bread-crumb-component',
    templateUrl: 'bread-crumb-component.html',
    styleUrls: ['bread-crumb-component.css']
})

export class BreadCrumbComponent{
    constructor(private dictionary : Dictionary,
                private storage : LocalStorageService,
                private breadcrumbService: BreadcrumbService) {
                    breadcrumbService.onBreadcrumbChange.subscribe((crumbs: Breadcrumb[]) => {
                        this.breadcrumbs = crumbs;
                    });                    
                } 

    @Input()
    langId: any = 0;    
    breadcrumbs: Breadcrumb[];

    diction = [];

    private items: MenuItem[];
    
    ngOnInit() {
        this.diction = this.dictionary.dictionary;
        this.items = [];
        this.items.push({label:'Categories'});   //diction[101][langId]
        this.items.push({label:'Sports'});
        this.items.push({label:'Football'});
        this.items.push({label:'Countries'});
        this.items.push({label:'Spain'});
        this.items.push({label:'F.C. Barcelona'});
        this.items.push({label:'Squad'});
        this.items.push({label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'});
    }
}