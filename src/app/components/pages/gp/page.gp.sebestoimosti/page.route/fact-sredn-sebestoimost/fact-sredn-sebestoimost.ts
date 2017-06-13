import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'fact-sredn-sebestoimost',
    templateUrl: 'fact-sredn-sebestoimost.html',
    styleUrls: ['fact-sredn-sebestoimost.css']
})

export class FactSrednSebeStoimostComponent implements OnInit{
    constructor(private service: AppService){};

    titelName = 'РАСЧЕТ СРЕДНЕЙ СЕБЕСТОИМОСТИ';    
    defualtDate = Date();

    arrMetodika = [];
    metodikaModel: Number;

    arrUsluga = [];
    uslugaModel: Number;

    arrPeriud = [];
    periudModel: Number;

    arrPoezdUchastok = [];
    poezdUchastokModel: Number;

    operaciaValue: Number = 2;
    izmeritelValue: Number = 2;

    balansStatus: boolean = false;
    combinaciaStatus: boolean = false;

    colculateSebestoimost(){
        //
    }

   resetParams(){
       //
   }

    ngOnInit(){
        this.arrMetodika = this.service.getMetodSebestoimost();
        this.metodikaModel = this.arrMetodika[0].id;

        this.arrUsluga = this.service.getUslugaSebestoimost();
        this.uslugaModel = this.arrUsluga[0].id; 

        this.arrPeriud = this.service.getPeriodSebestoimost();
        this.periudModel = this.arrPeriud[0].id;

    }
}