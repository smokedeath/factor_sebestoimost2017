import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'all-parametrs-view-component',
    templateUrl: 'all-parametrs-view-component.html',
    styleUrls: ['all-parametrs-view-component.css']
})

export class AllParametrsViewComponent implements OnInit {
    constructor(private service: AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}

    langId = 0;
    diction = [];
    
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


    updateIdLang(){
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
        if (this.langId == null){
            this.langId = 0;            
            this.storage.store('langId', this.langId);
        }
    }

}