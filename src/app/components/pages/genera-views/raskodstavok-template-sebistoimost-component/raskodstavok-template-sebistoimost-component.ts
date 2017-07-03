import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'raskodstavok-template-sebistoimost-component',
    templateUrl: 'raskodstavok-template-sebistoimost-component.html',
    styleUrls: ['raskodstavok-template-sebistoimost-component.css']
})


export class RaskodstavokTemplateSebistoimostComponent implements OnInit{      
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
    //
    defualtDate = Date();
    defaultLabel = "Элементы затрат:";
    diction: any;
    procentSchow: Boolean = false;
    userSetings;

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

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');        
        let user = this.storage.retrieve('userData');

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
        // Структурные подразделения
        this.service.getVladelic(user.session, user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.arrVladelic = [];
                                this.vladelicModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrVladelic.push({id: data[i].id, name: data[i].name});
                                    if (data[i].default==1) this.vladelicModel = this.arrVladelic[i].id;  
                                }                                              
                            } else console.log(data);
                        },
                        error => {
                            if (error.status==403){
                                this.service.goToLogin();
                            }else  if(error.status==500) {
                                console.log(error);
                            } else  console.log(error);
                        }
                    ); 
        this.service.getPostavschik(user.session, user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.arrPostavschik = [];
                                this.postavschikModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrPostavschik.push({id: data[i].id, name: data[i].name});
                                    if (data[i].default==1) this.postavschikModel = this.arrPostavschik[i].id;  
                                }                                              
                            } else console.log(data);
                        },
                        error => {
                            if (error.status==403){
                                this.service.goToLogin();
                            }else  if(error.status==500) {
                                console.log(error);
                            } else  console.log(error);
                        }
                    ); 

        this.arrItemSize = this.service.getItemSize();
        this.itemSizeModel = this.arrItemSize[0].id;

        //Тип периода
        this.service.getGenPeriodList(user.session, user.programmId, this.userSetings.langId)
                    .subscribe( 
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.arrtypePeriud = [];
                                this.typePeriudModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrtypePeriud.push({id: data[i].id, name: data[i].name});
                                    if (data[i].default==1) this.typePeriudModel = this.arrtypePeriud[i].id;  
                                }                                              
                            } else console.log(data);
                        },
                        error => {
                            if (error.status==403){
                                this.service.goToLogin();
                            }else  if(error.status==500) {
                                console.log(error);
                            } else  console.log(error);
                        }
                    );
        //статусы
        this.service.getStatus(user.session, user.programmId, this.userSetings.langId)
                    .subscribe( 
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.arrStatus = [];
                                this.statusModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrStatus.push({id: data[i].id, name: data[i].name});
                                    if (data[i].default==1) this.statusModel = this.arrStatus[i].id;  
                                }                                              
                            } else console.log(data);
                        },
                        error => {
                            if (error.status==403){
                                this.service.goToLogin();
                            }else  if(error.status==500) {
                                console.log(error);
                            } else  console.log(error);
                        }
                    );
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});

    }
}