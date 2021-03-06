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

    nUser = {
        email: this.service.user.email,
        name: this.service.user.name,
        phoneNumber: this.service.user.phoneNumber
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
    cbLangChang(e){
        this.userSetings.langId = e;
        this.updateProgramSetings();
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
                            }else  if(error.status==500){
                                this.showWarn(this.diction[170][this.langId]); 
                                console.log(error);
                            } else  console.log(error);
                        }
                    );
    }
    saveUserProfile(){
        let isSave = true;
        let errorText = '';
        if (this.nUser.name.length==0) {
            isSave = false;
            if (errorText.length>0) errorText = errorText + ', ' + this.diction[162][this.langId]  
            else errorText = this.diction[162][this.langId];
        }
        if (this.nUser.phoneNumber.length==0) {
            isSave = false;
            if (errorText.length>0) errorText = errorText + ', ' + this.diction[120][this.langId]  
            else errorText = this.diction[120][this.langId];
        }
        if (this.nUser.email.length==0) {
            isSave = false;
            if (errorText.length>0) errorText = errorText + ', ' + this.diction[155][this.langId]  
            else errorText = this.diction[155][this.langId];
        }

        if (isSave) {
            let data = {
                session: this.user.session,
                phoneNumber: this.nUser.phoneNumber,
                email: this.nUser.email,
                name: this.nUser.name
            }
            this.service.changeProfile(data, this.user.programmId, this.userSetings.langId)
                        .subscribe(
                            data => {   
                                if (data.status==200){
                                    this.showSuccess();
                                    this.storage.store('userData', this.nUser); 
                                } else console.log(data);
                            }, error => {
                                if (error.status==403){
                                    this.showDialog(this.diction[169][this.langId]);
                                    this.router.navigate(["login"]);
                                }else  if(error.status==500) {
                                    this.showWarn(this.service.getErrorFromData(error._body, 'class="error">', 'dao:')); 
                                    console.log(error);
                                } else  console.log(error);
                            }
                        );
        } else this.showWarn(this.diction[175][this.langId] + ' : ' + errorText); 
    }
    updatePassword(oldpass: String, pass1: String, pass2: String){
        let oldhash = this.storage.retrieve('md5'); 
        let oldpasshash = this.service.getMD5fromString(oldpass);
        if (oldhash==oldpasshash){
            if (this.getCorectPassword(oldpass)&&this.getCorectPassword(pass1)&&this.getCorectPassword(pass2)){
                if (pass1===pass2){
                    if (oldpass!=pass1){  
                        let data = {
                            session: this.user.session,
                            passwd: oldpass,
                            newPasswd: pass1
                        }
                        this.service.changePassword(data, this.user.programmId, this.userSetings.langId)
                                    .subscribe(
                                        data => {   
                                            if (data.status==200){
                                                this.showSuccess();
                                            } else console.log(data);
                                        }, error => {
                                            if (error.status==403){
                                                this.showDialog(this.diction[169][this.langId]);
                                                this.router.navigate(["login"]);
                                            }else  if(error.status==500) {
                                                this.showWarn(this.service.getErrorFromData(error._body, 'class="error">', 'dao:')); 
                                                console.log(error);
                                            } else  console.log(error);
                                        }
                                    );
                    }else this.showWarn(this.diction[172][this.langId]);
                } else this.showWarn(this.diction[171][this.langId]);
            }else this.showWarn(this.diction[173][this.langId]);
        }else this.showWarn(this.diction[174][this.langId]);
    }
    getCorectPassword(pass: String): Boolean{
        let result=true;        
        if (pass.charAt(0)==' ' || pass.indexOf(' ')>0) result=false;
        return result;
    };

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.service.user;     

        this.nUser = {
            email: this.user.email,
            name: this.user.name,
            phoneNumber: this.user.phoneNumber
        };  
        this.arrLangs = this.service.arrLangs;
    }

}