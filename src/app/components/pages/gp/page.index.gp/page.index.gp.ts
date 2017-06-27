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
    userSetings;

    bigBatton = [];
    
    updIdLang(idLang){
        this.userSetings.langId = idLang;
        this.logoName = this.diction[1][this.userSetings.langId];
        this.bigBatton = [
            {
                class: 'pricing__item',
                rlink: '/gp.date.input',
                name: this.diction[3][this.userSetings.langId],
                icon_type: 'cloud_download',
                label: this.diction[4][this.userSetings.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/gp.rashodstavok',
                name: this.diction[5][this.userSetings.langId],
                icon_type: 'assignment',
                label: this.diction[5][this.userSetings.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/gp.sebestoimosti',
                name: this.diction[6][this.userSetings.langId],
                icon_type: 'title',
                label: this.diction[6][this.userSetings.langId]
            },
            {
                class: 'pricing__item', 
                rlink: '/gp.analiz',
                name: this.diction[7][this.userSetings.langId],
                icon_type: 'multiline_chart',
                label: this.diction[7][this.userSetings.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/index.gp',
                name: this.diction[8][this.userSetings.langId],
                icon_type: 'directions_railway',
                label: this.diction[8][this.userSetings.langId]
            },
            {
                class: 'pricing__item',
                rlink: '/index.gp',
                name: this.diction[9][this.userSetings.langId],
                icon_type: 'equalizer',
                label: this.diction[9][this.userSetings.langId]
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