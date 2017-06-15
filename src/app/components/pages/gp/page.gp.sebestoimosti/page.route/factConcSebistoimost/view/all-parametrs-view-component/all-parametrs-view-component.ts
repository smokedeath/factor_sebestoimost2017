import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'all-parametrs-view-component',
    templateUrl: 'all-parametrs-view-component.html',
    styleUrls: ['all-parametrs-view-component.css']
})

export class AllParametrsViewComponent implements OnInit {
    constructor(private service: AppService) {}
    
    curentDate = Date();
    
    planFormirovanieBoolean: boolean = false;
    noItemsSearchBoolean: boolean = false;
    ohranaGruzaBoolean: boolean = false;

    vesGruzaModel: Number = 60;
    vagonCountModel: Number = 1;
    conteinerCountModel: Number = 1;

    arrPostavschikUslug = [];
    postavschikUslugModel: Number;

    arrusluga = [];
    UslugaModel: Number;

    arrVidSebestoimosti = [];
    vidSebestoimostiModel: Number;

    arrtypeSebestoimostiModel = [];
    typeSebestoimostiModel: Number;

    arrMetodRascheta = [];
    metodRaschetaModel: Number;

    arrPeriudType = [];
    periudTypeModel: Number;

    arrRodGruza = [];
    rodGruzaModel: Number;

    arrHorakteristikGruza = [];
    horakteristikGruzaModel: Number;

    arrVidSoobshenia = [];
    vidsoobsheniaModel: Number;

    arrVidGruzovoiOtpravki = [];
    vidGruzovoiOtpravkiModel: Number;

    arrGruzVagonType = [];
    gruzVagonTypeModel: Number;

    arrVagonPrinadlezhnost = [];
    vagonPrinadlezhnostModel: Number;

    arrConteinerType = [];
    conteinerTypeModel: Number;

    arrInvemterVagonPrinadlezhnost = [];
    invemterVagonPrinadlezhnostModel: Number;

    arrConteinerPrinadlezhnost = [];
    conteinerPrinadlezhnostModel: Number;

    ngOnInit(){
        //
    }

}