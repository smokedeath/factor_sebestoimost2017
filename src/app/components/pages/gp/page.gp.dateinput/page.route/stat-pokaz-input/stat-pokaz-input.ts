import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'stat-pokaz-input',
    templateUrl: 'stat-pokaz-input.html',
    styleUrls: ['stat-pokaz-input.css']
})

export class StatPokazInputComponent implements OnInit{
    constructor(private service : AppService){}  

    titelName = 'ЗАГРУЗКА СТАТИСТИЧЕСКИХ ПОКАЗАТЕЛЕЙ';
    
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

    arrGrupZnacheni = [];
    grupZnacheniModel: number;

    inputFromTemplate(){
        ///
    }

    exportToExcell(){
        let options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true, 
                showTitle: true 
            };
        new Angular2Csv(this.tableDate, 'My Report', options);
    }

    ngOnInit(){
        ///////////////////   Типо сервисы   ////////////////////  
        this.arrGrupZnacheni = this.service.getGrupZnacheni();
        this.arrVladelic = this.service.getVladelic();
        this.vladelicModel = this.arrVladelic[0].id;        
        this.grupZnacheniModel = this.arrGrupZnacheni[0].option[0].id; 

        //Тип периода
        this.service.getGenPeriodList()
                    .subscribe(data => {               
                        let dateInJson: any;   
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.arrtypePeriud.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.typePeriudModel = this.arrtypePeriud[0].id;
                    });
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    

}