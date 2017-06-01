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
         
    user = {
        login: '',
        password: '',
        programmId: "1"
    }

    public programms = [
        { value: 1, display: 'АО "КТЖ-Грузовые перевозки"' },
        { value: 2, display: 'Магистральная железнодорожная сеть' }
    ]


    loginEnter(){
        if (this.user.login.length>0 && this.user.password.length>0) {
            // тут будет проверка пароля
            if (this.user.login=='sysadmin' && this.user.password=='111') {
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
            }
            else alert("Неверный Логин или Пароль...");
        }else{                        
            alert("Не заполнены Логин или Пароль...");
        }
    }

    loginCancel(){
        this.user.login = '';
        this.user.password = '';
    }
}