import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Dictionary } from './../../../../assets/dictionary';
import { AppService } from './../../../share/app.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'componentlogin',
    templateUrl: 'component.login.html',
    styleUrls: ['component.login.css']
})

export class ComponentLogin implements OnInit{
    constructor(private router: Router,
                private dictionary : Dictionary,
                private storage : LocalStorageService,
                private service: AppService,) {}

    @Input()
    langId: any = 0;
    diction = [];

    refDialog: boolean = false;
    email: String;
    passShow: boolean = true;
    textType = "password";
    display: boolean = false;
    displayText: String = '';
         
    user = {
        login: '',
        password: '',
        programmId: 1,
        userId: 1
    }

    public users = [
        { value: 1, display: 'Аналитик' },
        { value: 2, display: 'Технолог' },
        { value: 3, display: 'Администратор' }
    ]

    public programms = [
        { value: 1, display: 'АО "КТЖ-Грузовые перевозки"' },
        { value: 2, display: 'Магистральная железнодорожная сеть' }
    ]
    showDialog(displayText) {
        this.displayText = displayText;
        this.display = true;
    }

    updIdLang(idLang){
        this.langId = idLang;
    }

    showPass(){
        if (this.passShow){this.textType = "text"}else{this.textType = "password"}
        this.passShow = !this.passShow;
    }

    getRefPass(){        
        this.email= "";
        this.refDialog = true;
    }
    	
    loginEnter(){
        if (this.user.login.length>0 && this.user.password.length>0) {
            // тут будет проверка пароля
        let data = {
            login: this.user.login,
            passwd: this.user.password
        }         

        this.service.postSessionIn(data, this.user.programmId, this.langId)
                    .subscribe(
                            data => {  
                                if (data.status==200){
                                    data = data.json();
                                    data = data.data;
                                    let user = {
                                            email: data.email,
                                            login: this.user.login,
                                            name: data.name,
                                            phoneNumber: data.phoneNumber,
                                            session: data.session,
                                            programmId: this.user.programmId,
                                            userSetings: this.service.StringToObject(data.userSettings)
                                        };
                                    let md5 = this.service.getMD5fromString(this.user.password);
                                    this.storage.store('md5', md5);
                                    this.storage.store('userData', user);
                                    this.storage.store('userSetings', user.userSetings);
                                    switch(Number(this.user.userId)){
                                        case 1: { 
                                            switch(this.user.programmId) { 
                                                case 1: { 
                                                    this.router.navigate(["index.gp"]);
                                                    break; 
                                                } 
                                                case 2: { 
                                                    this.router.navigate(["index.mzhs"]);
                                                    break; 
                                                } 
                                                default: { 
                                                    break; 
                                                } 
                                            } 
                                            break; 
                                        } 
                                        case 2: { 
                                            window.location.href='http://192.168.1.20:8080/xtofi/a/webmod/default/ru'
                                            break; 
                                        } 
                                        case 3: { 
                                            window.location.href='http://192.168.1.20:8080/xtofi/a/usr/default/ru/'
                                            break; 
                                        } 
                                        default: { 
                                            break; 
                                        } 
                                    }
                                } else {
                                   console.log(data);
                                }
                        }, error =>  {
                            this.getErrorDialog(this.service.getErrorFromData(error._body, 'class="error">', '<'));
                        }
                    );                  
        }else{           
            this.showDialog(this.diction[161][this.langId]); 
        }
    }
    getErrorDialog(error){
        this.showDialog(error);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.updIdLang(this.langId);
    }
}