import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'vibor-marschruta-view-component',
    templateUrl: 'vibor-marschruta-view-component.html',
    styleUrls: ['vibor-marschruta-view-component.css']
})

export class ViborMarschrutaViewComponent implements OnInit {
    constructor(private service: AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}
    
    userSetings;
    diction = [];
    distance: Number = 0;
    station1Model = 0;
    arrStation1 = [];
    station2Model = 0;
    arrStation2 = [];
    station3Model = 0;
    arrStation3 = [];


    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    btnSearch(){
        this.distance = 2066.66;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
    }
}