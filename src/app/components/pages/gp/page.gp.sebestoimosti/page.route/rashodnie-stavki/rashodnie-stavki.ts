import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'rashodnie-stavki',
    templateUrl: 'rashodnie-stavki.html',
    styleUrls: ['rashodnie-stavki.css']
})

export class RashodnieStavkiComponent {      
    constructor(private service : AppService){}  

    titelName = 'РАСХОДНЫЕ СТАВКИ';
    dopFiltr = false;
}