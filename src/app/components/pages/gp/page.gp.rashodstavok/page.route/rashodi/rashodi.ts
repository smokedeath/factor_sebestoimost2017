import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    templateUrl: 'rashodi.html',
    styleUrls: ['rashodi.css'],

})

export class RashodiComponent{
    constructor(private service : AppService){}  

    titelName = 'РАСХОДЫ'; 
}