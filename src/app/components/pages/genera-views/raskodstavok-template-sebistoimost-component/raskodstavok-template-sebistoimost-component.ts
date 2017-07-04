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
    user;

    arrtypePeriud = [];
    tableDate = [];
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
    noFixetColumns = [];

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
    refreschData(){
        this.getTabelData();
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
    getTabelData(){
        let param = {
            session: this.user.session,
            freightCarrier: this.vladelicModel,
            provider: this.postavschikModel,
            measure: this.itemSizeModel,
            status: this.statusModel,
            parent: 0,
            periodType: this.typePeriudModel,
            dte: this.service.getDataString(this.defualtDate)
        }
        // Таблица      
        this.service.getRashodiTable(param, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.noFixetColumns = [];
                                for (let i=0; i<data.сostElements.length; i++){
                                    if (this.userSetings.langId==0)
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.kz});   
                                    if (this.userSetings.langId==1)
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.ru});   
                                    if (this.userSetings.langId==2)
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.en});     
                                }
                                this.initTableColumns();
                                data = data.data;
                                this.inputTabelData(data, this.userSetings.langId);                                          
                            } else console.log(data);
                        },
                        error =>{
                            if (error.status==403){
                                this.service.goToLogin();
                            }else  if(error.status==500) {
                                console.log(error);
                            } else  console.log(error);
                        }
                    );   
    }
    inputTabelData(data, lang){        
        this.tableDate = [];
         for (let i=0; i<data.length; i++){  
             let dat = {};           
             for (let key in data[i]){
                if (key!='id'&&key!='name'){
                    if (this.procentSchow) dat[key] = data[i][key].percentValue;
                    else dat[key] = data[i][key].value;
                }else{
                    if (key=='id')dat[key] = data[i][key];
                    if (key=='name'){
                        if (lang==0) dat[key] = data[i][key].kz;
                        if (lang==1) dat[key] = data[i][key].ru;
                        if (lang==2) dat[key] = data[i][key].en;
                    }
                }
             }
             let inData = {
                 data: dat,
                 leaf: false
             }
             this.tableDate.push(inData);
         }
    }
    initTableColumns(){
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
    } 

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');        
        this.user = this.storage.retrieve('userData');
        ///////////////////   Типо сервисы   ////////////////////  
        // Структурные подразделения
        this.service.getVladelic(this.user.session, this.user.programmId, this.userSetings.langId)
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
        this.service.getPostavschik(this.user.session, this.user.programmId, this.userSetings.langId)
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
        //Единицы измерения  
        this.service.getItemSize(this.user.session, this.user.programmId, this.userSetings.langId)
                    .subscribe( 
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.arrItemSize = [];
                                this.itemSizeModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrItemSize.push({id: data[i].id, name: data[i].name});
                                    if (data[i].default==1) this.itemSizeModel = this.arrItemSize[i].id;  
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
        //Тип периода
        this.service.getGenPeriodList(this.user.session, this.user.programmId, this.userSetings.langId)
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
        this.service.getStatus(this.user.session, this.user.programmId, this.userSetings.langId)
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
        // this.getTabelData();
        this.initTableColumns();
    }
}