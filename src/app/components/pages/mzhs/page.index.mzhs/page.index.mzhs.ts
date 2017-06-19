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
    langId: any;    
    diction = [];
    
    bigBatton = [];    

    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[2][this.langId];
        this.bigBatton = [ 
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[3][this.langId],
                    icon_type: 'cloud_download',
                    label: this.diction[4][this.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[5][this.langId],
                    icon_type: 'assignment',
                    label: this.diction[5][this.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[6][this.langId],
                    icon_type: 'monetization_on',
                    label: this.diction[6][this.langId]
                },
                {
                    class: 'pricing__item',
                    rlink: '/index.mzhs',
                    name: this.diction[7][this.langId],
                    icon_type: 'event_note',
                    label: this.diction[7][this.langId]
                }
            ];   
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
        this.updIdLang(this.langId);
    }
}