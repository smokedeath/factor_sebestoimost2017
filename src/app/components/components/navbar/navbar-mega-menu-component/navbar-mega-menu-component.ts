import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navbar-mega-menu-component',
    templateUrl: 'navbar-mega-menu-component.html',
    styleUrls: ['navbar-mega-menu-component.css']
})

export class NavbarMegaMenuComponent implements OnInit{
    @Input()
    logoName: String;

    @Input()
    rLink: String;

    @Input()
    currentUser: String;

    @Output()
    getHelpPane: EventEmitter<any> = new EventEmitter();

    lang = {
        kz: false,
        ru: false,
        en: false
    } 

    emitHelpPane(){
        this.getHelpPane.emit(null);
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