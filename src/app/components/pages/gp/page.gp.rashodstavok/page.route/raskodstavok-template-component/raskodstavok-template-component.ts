import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'raskodstavok-template-component',
    templateUrl: 'raskodstavok-template-component.html',
    styleUrls: ['raskodstavok-template-component.css']
})


export class RaskodStavokTemplateComponent implements OnInit{      
    constructor(private service : AppService){}  
    //
    defualtDate = Date();

    arrtypePeriud = [];
    tableDate = [];

    tableDateColumns = [
        {
            field: "name",
            header: "Номер статьи"
        },
        {
            field: "name",
            header: "Наименование статьи"
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

    typePeriudModel: Number;  

    arrVladelic = [];   
    vladelicModel: Number; 
    
    arrPostavschik = [];
    postavschikModel: Number;

    arrStatus = [];
    statusModel: Number;
    
    arrItemSize = [];    
    itemSizeModel: Number;

    arrItemTableColumn = [];
    itemTableColumnModel: Number;

    summaryResult(){
        ///
    }

    exportToExcell(){
        //
    }

    viewTemplateFolder(){
        //
    }

    ngOnInit(){
        ///////////////////   Типо сервисы   ////////////////////  
        this. arrVladelic = this.service.getVladelic();
        this.arrPostavschik = this.service.getPostavschik();
        this.vladelicModel = this.arrVladelic[0].id;        
        this.postavschikModel = this.arrPostavschik[0].id; 
        this.arrItemSize = this.service.getItemSize();
        this.itemSizeModel = this.arrItemSize[0].id;
        this.arrItemTableColumn = this.service.getItemColumnsTable(); 

        //Тип периода
        this.arrtypePeriud = this.service.getGenPeriodList();
        this.typePeriudModel = this.arrtypePeriud[0].id;
        //статусы
        this.arrStatus = this.service.getStatus();
        this.statusModel = this.arrStatus[0].id;
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});

    }
}