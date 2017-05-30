import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-data-input.html',
    styleUrls: ['finance-data-input.css'],

})

export class FinanceDataInput implements OnInit{
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
            header: "Расходы на оплату труда"
        },
        {
            field: "size",
            header: "Отчисления от фонда оплаты труда"
        },
        {
            field: "size",
            header: "Материалы"
        },
        {
            field: "size",
            header: "Топливо"
        },
        {
            field: "size",
            header: "Электроэнергия"
        },
        {
            field: "size",
            header: "Оплата работ сторонних организаций"
        },
        {
            field: "size",
            header: "Оплата работ дочерних предприятий"
        },
        {
            field: "size",
            header: "Износ средств"
        },
        {
            field: "size",
            header: "Прочие расходы"
        },
        {
            field: "size",
            header: "Сумма по элементам"
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

    arrPostavschik = [{id: 1, name: "Поставщик"}];
    postavschikModel: number;

    arrStatus = [];
    statusModel: number;

    inputFromTemplate(){
        ///
    }

    exportToExcell(){
        //
    }

    ngOnInit(){
        ///////////////////   Типо сервисы   ////////////////////  
        this.vladelicModel = this.arrVladelic[0].id;        
        this.postavschikModel = this.arrPostavschik[0].id; 

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
        //статусы
        this.service.getStatus()
                    .subscribe(data => {               
                        let dateInJson: any;   
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.arrStatus.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.statusModel = this.arrStatus[0].id;
                    });
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    

}