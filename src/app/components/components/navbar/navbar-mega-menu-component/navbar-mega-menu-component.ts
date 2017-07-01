import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import {LocalStorageService} from 'ngx-webstorage';
import { Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'navbar-mega-menu-component',
    templateUrl: 'navbar-mega-menu-component.html',
    styleUrls: ['navbar-mega-menu-component.css']
})

export class NavbarMegaMenuComponent implements OnInit{    
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private router: Router,
                private storage : LocalStorageService) {} 

    @Input()
    navbarLevel: Number;

    @Input()
    logoName: String;

    @Input()
    rLink: String;    

    @Input()
    smallMenu = [];

    @Output()
    updateIdLang: EventEmitter<number> = new EventEmitter();
    
    diction: any;
    userSetings;
    user;
    display: boolean = false;
        
    currentUser: String;

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
    langClick(lng: Number, overlaypanel: OverlayPanel){
        this.userSetings.langId = lng;
        this.storage.store('UserSetings', this.userSetings);
        this.updateIdLang.emit(this.userSetings.langId);        
        overlaypanel.toggle(event);  
        overlaypanel.toggle(event); 
    }
    exitToLogin(){
        this.display = true;
    }
    CancelExit(){        
        this.display = false;
    }
    ConfirmExit(){
        this.display = false;
        this.service.sessionOut(this.user.session ,this.user.programmId, this.userSetings.langId);
        this.service.clearProgrammSession();
        this.router.navigate(["login"]);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.storage.retrieve('userData');
        this.currentUser = this.service.user.name;
    }
}