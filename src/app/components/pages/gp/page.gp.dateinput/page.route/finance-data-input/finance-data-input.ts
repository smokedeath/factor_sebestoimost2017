import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-data-input.html',
    styleUrls: ['finance-data-input.css'],

})

export class FinanceDataInput implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
    diction: any;
    userSetings  = this.service.userSetings;

    titelName = 'ЗАГРУЗКА ФИНАНСОВЫХ ДАННЫХ';
    defualtDate = Date();
    procentSchow: boolean = false;
    defaultLabel = "Элементы затрат:"; 

    arrtypePeriud = [];
    tableDate = [];
    FilterTableDate = [];
    tableDateOptions = [];

    fixetColumns = [
        {
            field: "id",
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

    inputFromTemplate(){
        ///
    }
    onRefresch(){        
        //
    }
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
    updateSetings(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.updateSetings();

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
        this.arrVladelic = this.service.getVladelic();
        this.arrPostavschik = this.service.getPostavschik();
        this.vladelicModel = this.arrVladelic[0].id;        
        this.postavschikModel = this.arrPostavschik[0].id; 
        this.arrItemSize = this.service.getItemSize();
        this.itemSizeModel = this.arrItemSize[0].id;

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
        //статусы
        this.arrStatus = this.service.getStatus();
        this.statusModel = this.arrStatus[0].id;
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {
            this.tableDate = data.json().data
        });
    }    

}