import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'explotation-pokaz',
    templateUrl: 'explotation-pokaz.html',
    styleUrls: ['explotation-pokaz.css']
})

export class ExplotationPokazComponent implements OnInit{
    constructor(private service : AppService){}  

    titelName = 'ЭКСПЛУАТАЦИОННЫЕ ПОКАЗАТЕЛИ';
    
    arrtypePeriud = [];
    tableDate = [];
    tableDateColumns = [
        {
            field: "name",
            header: "Наименование измерителей"
        },
        {
            field: "size",
            header: "Еденица измерения"
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

    arrGrupZnacheni = [];
    grupZnacheniModel: number;
           
    arrStatus = [];
    statusModel: number;

    exportToExcell(){
        let options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true, 
                showTitle: true 
            };
        // new Angular2Csv(this.tableDate, 'My Report', options);
    }

    ngOnInit(){
        ///////////////////   Типо сервисы   ////////////////////          
        this.arrStatus = this.service.getStatus();
        this.statusModel = this.arrStatus[0].id;

        this.arrVladelic = this.service.getVladelic();
        this.vladelicModel = this.arrVladelic[0].id;        

        //Тип периода
        this.arrtypePeriud = this.service.getGenPeriodList();
        this.typePeriudModel = this.arrtypePeriud[0].id;
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    

}