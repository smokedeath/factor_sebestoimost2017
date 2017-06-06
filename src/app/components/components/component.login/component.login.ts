import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { MdDialog } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'componentlogin',
    templateUrl: 'component.login.html',
    styleUrls: ['component.login.css']
})

export class ComponentLogin{
    constructor(
        private router: Router) {}

    refDialog: boolean = false;
    email: String;
    passShow: boolean = true;
    textType = "password";
         
    user = {
        login: '',
        password: '',
        programmId: "1",
        userId: "1"
    }

    public users = [
        { value: 1, display: 'Аналитик' },
        { value: 2, display: 'Технолог' },
        { value: 3, display: 'Администратор' }
    ]

    public programms = [
        { value: "1", display: 'АО "КТЖ-Грузовые перевозки"' },
        { value: "2", display: 'Магистральная железнодорожная сеть' }
    ]

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
            if (this.user.login=='sysadmin' && this.user.password=='111') {  
                switch(this.user.userId){
                    case "1": { 
                        switch(this.user.programmId) { 
                            case "1": { 
                                this.router.navigate(["index.gp"]);
                                break; 
                            } 
                            case "2": { 
                                this.router.navigate(["index.mzhs"]);
                                break; 
                            } 
                            default: { 
                                break; 
                            } 
                        } 
                        break; 
                    } 
                    case "2": { 
                        window.location.href='http://192.168.1.20:8080/xtofi/a/webmod/default/ru'
                        break; 
                    } 
                    case "3": { 
                        window.location.href='http://192.168.1.20:8080/xtofi/a/usr/default/ru/'
                        break; 
                    } 
                    default: { 
                        break; 
                    } 
                }
            }
            else alert("Неверный Логин или Пароль...");
        }else{                        
            alert("Не заполнены Логин или Пароль...");
        }
    }
}