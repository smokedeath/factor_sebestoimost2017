import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from "@angular/router";

import { LoginDialog } from '../dialogs/login.dialog/login.dialog';

@Component({
    moduleId: module.id,
    selector: 'index.page',
    templateUrl: 'index.page.html',
    styleUrls: ['index.page.css']
})

export class IndexPage{
  copyright_caption = '2017 © ТОО "Научно-исследовательский институт экономики и информатизации транспорта, телекоммуникаций"';

  selectedOption: string;

  constructor(private router: Router,
              public dialog: MdDialog) {}

  openDialog() {    
    this.router.navigate(["ft"]); // переход на Грузовые перевозки

    // Диалог с логином(Доделать после подключения скрвисов)
    // let dialogRef = this.dialog.open(LoginDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedOption = result;
    // });
  }
}