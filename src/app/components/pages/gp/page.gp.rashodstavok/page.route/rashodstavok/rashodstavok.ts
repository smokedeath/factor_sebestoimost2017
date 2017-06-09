import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'rashodstavok',
    templateUrl: 'rashodstavok.html',
    styleUrls: ['rashodstavok.css']
})

export class RashodStavokComponent{    
    titelName = 'РАСЧЕТ РАСХОДНЫХ СТАВОК';
    dopFiltr = false;
    defualtDate = Date();
}