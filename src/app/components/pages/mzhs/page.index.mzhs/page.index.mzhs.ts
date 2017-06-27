import { Component, OnInit } from '@angular/core';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'page-index-mzhs',
    templateUrl: 'page.index.mzhs.html',
    styleUrls: ['page.index.mzhs.css']
})

export class PageIndexMzhs implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}
    logoName = ''; //'../assets/admin/layout5/img/logo_mzhs_new.png';
    rExitLink = '/login'; ///login
    navbarLevel = 1;    
    diction = [];
    userSetings;
    
    bigBatton = [];    

    updIdLang(idLang){
        this.userSetings.langId = idLang;
        this.logoName = this.diction[2][this.userSetings.langId];
        this.bigBatton = [ 
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[3][this.userSetings.langId],
                    icon_type: 'cloud_download',
                    label: this.diction[4][this.userSetings.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[5][this.userSetings.langId],
                    icon_type: 'assignment',
                    label: this.diction[5][this.userSetings.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[6][this.userSetings.langId],
                    icon_type: 'monetization_on',
                    label: this.diction[6][this.userSetings.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[7][this.userSetings.langId],
                    icon_type: 'event_note',
                    label: this.diction[7][this.userSetings.langId]
                }
            ];   
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.updIdLang(this.userSetings.langId);
    }
}