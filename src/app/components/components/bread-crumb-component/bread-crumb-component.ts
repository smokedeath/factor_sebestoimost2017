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
                        this.getBreadcrumbs();
                    });                    
                } 

    @Input()
    langId: any = 0;    

    localIdLang: any = this.langId;

    breadcrumbs: Breadcrumb[];
    diction = [];

    private items: MenuItem[];

    getBreadcrumbs(){
        if (this.breadcrumbs!=null && this.breadcrumbs.length>0){
            this.localIdLang = this.langId;
            this.items = [];
            this.items.push({label:this. diction[0][this.langId].toUpperCase(), routerLink: '/login'});
            if (this.breadcrumbs[0].cIndex==1){
                this.items.push({label:this. diction[1][this.langId].toUpperCase(), routerLink: '/index.gp'});
            }else{
                this.items.push({label:this. diction[1][this.langId].toUpperCase(), routerLink: '/index.mzhs'});
            }
            for (let i=0; i<this.breadcrumbs.length; i++){
                this.items.push({label:this. diction[this.breadcrumbs[i].index][this.langId].toUpperCase()});
            }
        }
    }

    updateIdlang(){
        if (this.localIdLang!=this.langId){
            this.getBreadcrumbs();
        }
    }
    
    ngOnInit() {
        this.diction = this.dictionary.dictionary;
    }
}