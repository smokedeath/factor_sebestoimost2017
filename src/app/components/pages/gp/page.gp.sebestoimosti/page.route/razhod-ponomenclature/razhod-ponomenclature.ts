import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'razhod-ponomenclature',
    templateUrl: 'razhod-ponomenclature.html',
    styleUrls: ['razhod-ponomenclature.css']

})

export class RazhodPoNomenclature implements OnInit{
    constructor(private service : AppService){}  

    titelName = 'РАСХОДЫ ПО НОМЕНКЛАТУРЕ';

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
     
    arrVladelic = [];   
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
        this.arrVladelic = this.service.getVladelic();
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