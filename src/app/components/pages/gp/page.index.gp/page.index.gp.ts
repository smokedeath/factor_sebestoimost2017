import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'pageindexgp',
    templateUrl: 'page.index.gp.html',
    styleUrls: ['page.index.gp.css']
})

export class PageIndexGp implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}

    logoName = '';
    rExitLink = '/login'; ///login
    navbarLevel = 1;
    diction = [];
    langId: any = 0;

    bigBatton = [];
    
    updIdLang(idLang){
        this.langId = idLang;
        this.logoName = this.diction[1][this.langId];
        this.bigBatton = [
            {
                class: 'pricing__item',
                rlink: '/gp.date.input',
                name: this.diction[3][this.langId],
                icon_type: 'cloud_download',
                label: this.diction[4][this.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/gp.rashodstavok',
                name: this.diction[5][this.langId],
                icon_type: 'assignment',
                label: this.diction[5][this.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/gp.sebestoimosti',
                name: this.diction[6][this.langId],
                icon_type: 'title',
                label: this.diction[6][this.langId]
            },
            {
                class: 'pricing__item', 
                rlink: '/gp.analiz',
                name: this.diction[7][this.langId],
                icon_type: 'multiline_chart',
                label: this.diction[7][this.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/index.gp',
                name: this.diction[8][this.langId],
                icon_type: 'directions_railway',
                label: this.diction[8][this.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/index.gp',
                name: this.diction[9][this.langId],
                icon_type: 'equalizer',
                label: this.diction[9][this.langId]
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