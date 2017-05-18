import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'logindialog',
  templateUrl: './login.dialog.html',
  styleUrls: ['login.dialog.css']
})



export class LoginDialog {
  constructor(
       private router: Router,
       public dialogRef: MdDialogRef<LoginDialog>) {}

  user = {
    login: "",
    password: ""
  }

  login() {
    this.router.navigate(["ft"]);
  }
}