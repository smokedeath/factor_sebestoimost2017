import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { TreeNode } from 'primeng/primeng';

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

    nameFactors: TreeNode[];
    selectedNameFactors: TreeNode;

    colculateSebestoimost(){
        //
    }

   resetParams(){
        this.balansStatus = false;
        this.combinaciaStatus = false;
        this.operaciaValue = 2;
        this.izmeritelValue = 2;
        this.poezdUchastokModel = 0;
        this.periudModel = 0;
        this.uslugaModel = 0;
        this.metodikaModel = 0;
        this.metodikaModel = 0;
        this.defualtDate = Date();
   }

    ngOnInit(){
        this.arrMetodika = this.service.getMetodSebestoimost();
        this.metodikaModel = this.arrMetodika[0].id;

        this.arrUsluga = this.service.getUslugaSebestoimost();
        this.uslugaModel = this.arrUsluga[0].id; 

        this.arrPeriud = this.service.getPeriodSebestoimost();
        this.periudModel = this.arrPeriud[0].id;

        this.nameFactors = this.service.getSebestoimostFacGP();        
                // .subscribe(data => {               
                //     let dateInJson: any;   
                //     dateInJson = data.json();
                    // for (let i = 0; i<dateInJson.length; i++){
                    //     this.arrtypePeriud.push({                        
                    //         name: dateInJson[i].name_ru,
                    //         id: dateInJson[i].id
                    //     });
                    // }   
                // });

    }
}