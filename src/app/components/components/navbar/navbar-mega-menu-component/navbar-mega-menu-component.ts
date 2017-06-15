import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'navbar-mega-menu-component',
    templateUrl: 'navbar-mega-menu-component.html',
    styleUrls: ['navbar-mega-menu-component.css']
})

export class NavbarMegaMenuComponent implements OnInit{    
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {} 

    @Input()
    navbarLevel: Number;

    @Input()
    logoName: String;

    @Input()
    rLink: String;    

    @Input()
    smallMenu = [];
    
    langId: any;
    diction: any;
    visibleLabel: Boolean = false;

    user = {
        fam: this.service.user.fam,
        name: this.service.user.name,
        otch: this.service.user.otch,
        password: this.service.user.password
    }
        
    currentUser = this.user.fam + ' ' + this.user.name + ' ' + this.user.otch;

    lang = {
        kz: false,
        ru: false,
        en: false
    } 
    closePanel(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event);   
    }    

    closePanelOut(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event);
        overlaypanel.toggle(event);
    }   

    langClick(lng: Number){
        this.langId = lng;
        this.storage.store('langId', this.langId);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
        if (this.langId == null){
            this.langId = 0;            
            this.storage.store('langId', this.langId);
        }
    }
}