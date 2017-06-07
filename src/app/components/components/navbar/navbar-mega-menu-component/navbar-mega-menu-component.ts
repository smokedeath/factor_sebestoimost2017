import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-mega-menu-component',
    templateUrl: 'navbar-mega-menu-component.html',
    styleUrls: ['navbar-mega-menu-component.css']
})

export class NavbarMegaMenuComponent implements OnInit{    
    constructor(private service : AppService) {} 

    @Input()
    navbarLevel: Number;

    @Input()
    logoName: String;

    @Input()
    rLink: String;    

    @Input()
    smallMenu = [];

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

    langClick(lng: Number){
        switch (lng) {
            case 1: {
                this.lang.kz = true;
                this.lang.ru = false;
                this.lang.en = false;
                break;
            }
            case 2: {
                this.lang.kz = false;
                this.lang.ru = true;
                this.lang.en = false;
                break;
            }
            case 3: {
                this.lang.kz = false;
                this.lang.ru = false;
                this.lang.en = true;
                break;
            }
            default: { 
                break; 
            } 
        }
    }

    ngOnInit(){
        this.lang.kz = true;
    }
}