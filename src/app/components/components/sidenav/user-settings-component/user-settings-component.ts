import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'user-settings-component',
    templateUrl: 'user-settings-component.html',
    styleUrls: ['user-settings-component.css']
})

export class UserSettingsComponent implements OnInit{ 
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private router: Router,
                private storage : LocalStorageService) {} 

    @Input()
    langId: any = 0;

    @Output()
    closeSide: EventEmitter<any> = new EventEmitter();

    diction = [];
    userSetings;
    arrLangs = [];
    msgs: Message[] = [];
    display: boolean = false;
    displayText: String = '';

    user = {
        email: this.service.user.email,
        login: this.service.user.login,
        name: this.service.user.name,
        phoneNumber: this.service.user.phoneNumber,
        session: this.service.user.session,
        programmId: this.service.user.programmId,
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

    showDialog(displayText) {
        this.displayText = displayText;
        this.display = true;
    }
    closeShowDialog(){
        this.display = false;
        this.router.navigate(["login"]);
    }

    showSuccess() {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:this.diction[152][this.langId], detail:this.diction[168][this.langId]});
    }

    showWarn(text) {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary: this.diction[152][this.langId], detail:text});
    }


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
    saveProgramSetings(){       
        let userSetings: String = this.service.objecToString(this.userSetings); 
        console.log(userSetings);
        let data = {
            session: this.user.session,
            userSettings: userSetings
        }
        this.service.saveSettings(data, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                this.showSuccess();
                            }else{
                                console.log(data);
                            }
                        }, error => {
                            if (error.status==403){
                                this.showDialog(this.diction[169][this.langId]);
                                this.router.navigate(["login"]);
                            }else  if(error.status==500) this.showWarn(this.diction[170][this.langId]); else  console.log(error);
                        }
                    );
    }
    saveUserProfile(){
        let data = {
            session: this.user.session,
            phoneNumber: this.user.phoneNumber,
            email: this.user.email,
            name: this.user.name
        }
        this.service.changeProfile(data, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {   
                            if (data.status==200){
                                this.showSuccess();
                                // this.user.email = data.email;
                                // this.user.phoneNumber = data.phoneNumber;
                                // this.user.name = data.name;
                                // this.storage.store('userData', this.user); 
                            } else console.log(data);
                        }, error => {
                            if (error.status==403){
                                this.showDialog(this.diction[169][this.langId]);
                                this.router.navigate(["login"]);
                            }else  if(error.status==500) this.showWarn(this.diction[170][this.langId]); else  console.log(error);
                        }
                    );
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.service.user;
        this.arrLangs = this.service.arrLangs;
    }

}