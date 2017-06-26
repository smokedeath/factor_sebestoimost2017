import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'user-settings-component',
    templateUrl: 'user-settings-component.html',
    styleUrls: ['user-settings-component.css']
})

export class UserSettingsComponent implements OnInit{ 
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {} 

    @Input()
    langId: any = 0;

    @Output()
    closeSide: EventEmitter<any> = new EventEmitter();

    diction = [];
    userSetings;

    user = {
        login: this.service.user.login,
        fam: this.service.user.fam,
        name: this.service.user.name,
        otch: this.service.user.otch,
        password: ''
    }

    newEmail: String = '';

    pas = {
        firstpass: '',
        secondpass: '',
        oldpass: ''
    }

    passShow: boolean = true;
    textType = 'password';

    closeSidClicke(){
        this.closeSide.emit(null);
    }

    showPass(){
        if (this.passShow){this.textType = "text"}else{this.textType = "password"}
        this.passShow = !this.passShow;
    }

    onChClick(){
        this.pas.firstpass = '';
        this.pas.secondpass = '';
        this.pas.oldpass = '';
    }

    updateProgramSetings(){
        this.storage.store('UserSetings', this.userSetings);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.userSetings = this.service.userSetings;
    }

}