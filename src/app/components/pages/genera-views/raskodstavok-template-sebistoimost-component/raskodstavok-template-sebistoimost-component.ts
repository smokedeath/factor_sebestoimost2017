import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'raskodstavok-template-sebistoimost-component',
    templateUrl: 'raskodstavok-template-sebistoimost-component.html',
    styleUrls: ['raskodstavok-template-sebistoimost-component.css']
})


export class RaskodstavokTemplateSebistoimostComponent implements OnInit{      
    constructor(private service : AppService){}  
    //
    defualtDate = Date();
    defaultLabel = "Элементы затрат:";

    arrtypePeriud = [];
    tableDate = [];
    tableDateOptions = [];

    fixetColumns = [
        {
            field: "name",
            header: "Номер статьи"
        },
        {
            field: "name",
            header: "Наименование статьи"
        }
    ];
    noFixetColumns = [
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
    ];

    tableDateColumns = []; 

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

    exportToExcell(){
        //
    }

    viewTemplateFolder(){
        //
    }
    updateTableColumns(columns: any[]){
        let newColumns = columns;
        this.tableDateColumns = [];
        for (let i=0; i<this.fixetColumns.length; i++){
            this.tableDateColumns.push({field: this.fixetColumns[i].field, header: this.fixetColumns[i].header});
        }
        for (let i=0; i<newColumns.length; i++){
            this.tableDateColumns.push({field: newColumns[i].field, header: newColumns[i].header});
        }
    }

    ngOnInit(){
        this.tableDateColumns = [];
        for (let i=0; i<this.fixetColumns.length; i++){
            this.tableDateColumns.push({field: this.fixetColumns[i].field, header: this.fixetColumns[i].header});
        }
        for (let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateColumns.push({field: this.noFixetColumns[i].field, header: this.noFixetColumns[i].header});
        }

        for(let i=0; i<this.noFixetColumns.length; i++){    
            this.tableDateOptions.push({label: this.noFixetColumns[i].header, value: this.noFixetColumns[i], check: true});  
        }
        ///////////////////   Типо сервисы   ////////////////////  
        this. arrVladelic = this.service.getVladelic();
        this.arrPostavschik = this.service.getPostavschik();
        this.vladelicModel = this.arrVladelic[0].id;        
        this.postavschikModel = this.arrPostavschik[0].id; 
        this.arrItemSize = this.service.getItemSize();
        this.itemSizeModel = this.arrItemSize[0].id;

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