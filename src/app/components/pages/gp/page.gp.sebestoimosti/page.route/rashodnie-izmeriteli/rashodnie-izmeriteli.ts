import {  Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'rashodnie-izmeriteli',
    templateUrl: 'rashodnie-izmeriteli.html',
    styleUrls: ['rashodnie-izmeriteli.css']

})

export class RazhodnieIzmeriteli{    
    constructor(private service : AppService){}  

    titelName = 'РАСХОДНЫЕ ИЗМЕРИТЕЛИ';
    
    arrtypePeriud = [];
    tableDate = [];
    tableDateColumns = [
        {
            field: "name",
            header: "Наименование"
        },
        {
            field: "size",
            header: "План"
        },
        {
            field: "size",
            header: "Факт"
        }
    ]  

    typePeriudModel: number;
    
    arrVladelic = [];
    vladelicModel: number; 

    arrGrupZnachen = [];
    grupZnachenModel: number;

    inputFromTemplate(){
        ///
    }

    exportToExcell(){
        //
    }

    ngOnInit(){
        ///////////////////   Типо сервисы   //////////////////// 
        this.arrGrupZnachen = this.service.getGrupZnachen();
        this.arrVladelic = this.service.getVladelic();  
        this.vladelicModel = this.arrVladelic[0].id;        
        this.grupZnachenModel = this.arrGrupZnachen[0].id; 

        //Тип периода
        this.arrtypePeriud = this.service.getGenPeriodList();
        this.typePeriudModel = this.arrtypePeriud[0].id;
                    // .subscribe(data => {               
                    //     let dateInJson: any;   
                    //     dateInJson = data.json();
                    //     for (let i = 0; i<dateInJson.length; i++){
                    //         this.arrtypePeriud.push({                        
                    //             name: dateInJson[i].name_ru,
                    //             id: dateInJson[i].id
                    //         });
                    //     }   
                    //     this.typePeriudModel = this.arrtypePeriud[0].id;
                    // });
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    
}