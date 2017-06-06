import { Component } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'pagelogin',
    templateUrl: 'page.login.html',
    styleUrls: ['page.login.css']
})

export class PageLogin{
    logoName = '../assets/admin/layout5/img/logo.png';
    navbarLevel = 0;

    getPanel(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event); 
    }  
}