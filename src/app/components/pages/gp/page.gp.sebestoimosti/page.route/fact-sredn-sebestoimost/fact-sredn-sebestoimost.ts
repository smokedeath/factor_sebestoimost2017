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
    preloaderText = 'Подождите. Идёт расчет...'; 
    disabled = false;
    colculate = 0;
    curentDate = Date();
    activTabPanel: Number;

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
        if (!this.disabled){
            this.activTabPanel = 1;
            this.colculate = 1;
            this.disabled = true;
        }
    }
    canselColculateSebestoimost(){
        if (this.disabled){
            this.activTabPanel = 0;
            this.colculate = 0;
            this.disabled =false;
        }
    }

   resetParams(){
        if (!this.disabled){
            this.balansStatus = false;
            this.combinaciaStatus = false;
            this.operaciaValue = 2;
            this.izmeritelValue = 2;
            this.poezdUchastokModel = 0;
            this.periudModel = 0;
            this.uslugaModel = 0;
            this.metodikaModel = 0;
            this.metodikaModel = 0;
            this.curentDate = Date();
        }
   }

   getDate(datepar: Date){
     datepar = new Date(datepar);
     let day = datepar.getDate();  
     let m = datepar.getMonth() + 1;
     let month: String;
     if (m < 10){ month = '0' + m };
     let year = datepar.getFullYear();
     return year + "-" + month + "-" + day;
  }

   handleChange(e) {
        this.activTabPanel = e.index;
   }

   exportToExcell(){
       //
   }   
   getNameByid(arr: any[], id: Number){
        let name: String = '';
        for (let i=0; i<arr.length; i++){
            if (arr[i].id==id) {name = arr[i].name};
        }
        return name;
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