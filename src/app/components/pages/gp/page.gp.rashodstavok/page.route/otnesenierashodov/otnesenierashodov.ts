import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'otnesenierashodov',
    templateUrl: 'otnesenierashodov.html',
    styleUrls: ['otnesenierashodov.css']
})

export class OtnesenieRashodovComponent {      
    constructor(private service : AppService){}  

    titelName = 'ОТНЕСЕНИЕ РАСХОДОВ';
    dopFiltr = false;
}