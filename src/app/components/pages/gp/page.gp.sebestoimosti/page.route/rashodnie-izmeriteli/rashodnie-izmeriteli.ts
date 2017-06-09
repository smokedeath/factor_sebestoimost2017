import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'rashodnie-izmeriteli',
    templateUrl: 'rashodnie-izmeriteli.html',
    styleUrls: ['rashodnie-izmeriteli.css']

})

export class RazhodnieIzmeriteli{    
    constructor(private service : AppService){}  

    titelName = 'РАСХОДЫ ПО РАСХОДНЫМ ИЗМЕРИТЕЛЯМ'; 

}