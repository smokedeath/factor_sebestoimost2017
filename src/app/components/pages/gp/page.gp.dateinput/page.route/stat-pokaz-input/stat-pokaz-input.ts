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
    
    arrVladelic = [{id:1,name:"Грузовой Перевозчик"},{id:2,name:"ДН-1 Акмола"},{id:3,name:"ДН-2 Костанай"},{id:4,name:"ДН-3 Павлодар"},
                   {id:5,name:"ДН-4 Караганда"},{id:6,name:"ДН-5 ЗАЩИТА (К ДН-6 СЕМЕЙ)"},{id:7,name:"ДН-6 Семей"},{id:8,name:"ДН-7 Алматы"},
                   {id:9,name:"ДН-8 Жамбыл"},{id:10,name:"ДН-9 Шымкент"},{id:11,name:"ДН-10 Кызыл-Орда"},{id:12,name:"ДН-11 Актобе"},
                   {id:13,name:"ДН-12 Уральск"},{id:14,name:"ДН-13 Атырау"},{id:15,name:"НОД-14 Мангистау"},{id:16,name:"ДС Астана"},
                   {id:17,name:"ДС Достык"},{id:18,name:"ДС Алтынколь"}    
                  ]   

    vladelicModel: number; 

    arrGrupZnacheni = [
                        {id: 1, name: "Группа измерителей",
                                option:[
                                    {id: 11, name: "Измеритель 1"},
                                    {id: 12, name: "Измеритель 2"},
                                    {id: 13, name: "Измеритель 3"}
                                ]
                        },
                        {id: 2, name: "Группа статистических показателей",
                                option:[
                                    {id: 21, name: "Статистический показатель 1"},
                                    {id: 22, name: "Статистический показатель 2"},
                                    {id: 23, name: "Статистический показатель 3"}
                                ]
                        },
                        {id: 3, name: "Группа доходных измерителей",
                                option:[
                                    {id: 31, name: "Доходный измеритель 1"},
                                    {id: 32, name: "Доходный измеритель 2"},
                                    {id: 33, name: "Доходный измеритель 3"}
                                ]
                        }
                      ];
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