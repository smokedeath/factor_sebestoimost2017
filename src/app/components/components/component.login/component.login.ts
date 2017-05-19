import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {MdDialog} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'componentlogin',
    templateUrl: 'component.login.html',
    styleUrls: ['component.login.css']
})

export class ComponentLogin{
    constructor(
        private router: Router,
        public dialog: MdDialog) {}

    user = {
        login: '',
        password: '',
        programmId: '1'
    }

    public programms = [
        { value: '1', display: 'АО "КТЖ-Грузовые перевозки"' },
        { value: '2', display: 'Магистральная железнодорожная сеть' }
    ]


    loginEnter(){
        if (this.user.login.length>0 || this.user.password.length>0) {
            // тут будет проверка пароля
            this.router.navigate(["ft"]);
        }else{            
            this.dialog.open(ErrorDialog);
        }
    }

    loginCancel(){
        this.user.login = '';
        this.user.password = '';
    }
    ///////////////////////
}

@Component({
  selector: 'error-dialog',
  template: ` <h3>Внимание!</h3> <br> <p>Введён неверный логин или пароль.</p>`,
})
export class ErrorDialog {}