import { Component } from '@angular/core';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'user-settings-component',
    templateUrl: 'user-settings-component.html',
    styleUrls: ['user-settings-component.css']
})

export class UserSettingsComponent{ 
    constructor(private service : AppService) {} 

    user = {
        fam: this.service.user.fam,
        name: this.service.user.name,
        otch: this.service.user.otch,
        password: '',
        isActive:  false
    }

    pas = {
        firstpass: '',
        secondpass: '',
        oldpass: ''
    }

    passShow: boolean = true;
    textType = 'password';

    showPass(){
        if (this.passShow){this.textType = "text"}else{this.textType = "password"}
        this.passShow = !this.passShow;
    }

    onChClick(){
        this.pas.firstpass = '';
        this.pas.secondpass = '';
        this.pas.oldpass = '';
    }

}