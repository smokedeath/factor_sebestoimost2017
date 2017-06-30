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
        email: this.service.user.email,
        login: this.service.user.login,
        name: this.service.user.name,
        phoneNumber: this.service.user.phoneNumber,
        session: this.service.user.session,
        userSetings: this.service.user.userSetings
    };

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
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.service.user;
    }

}