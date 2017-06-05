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
        { value: 2, display: 'Администратор' }
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
                if (this.user.userId=="1") {
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
                } else
                {
                    window.location.href='http://ya.ru/';
                }   
            }
            else alert("Неверный Логин или Пароль...");
        }else{                        
            alert("Не заполнены Логин или Пароль...");
        }
    }
}