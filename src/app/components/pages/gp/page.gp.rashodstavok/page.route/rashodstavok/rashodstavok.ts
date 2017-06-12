import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'rashodstavok',
    templateUrl: 'rashodstavok.html',
    styleUrls: ['rashodstavok.css']
})

export class RashodStavokComponent {      
    constructor(private service : AppService){}  

    titelName = 'РАСЧЕТ РАСХОДНЫХ СТАВОК';
    dopFiltr = false;
}