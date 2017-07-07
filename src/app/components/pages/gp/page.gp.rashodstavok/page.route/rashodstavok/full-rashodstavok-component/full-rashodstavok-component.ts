import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'full-rashodstavok-component',
    templateUrl: 'full-rashodstavok-component.html'
})

export class FullRashodStavokComponent implements OnInit{      
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
    userSetings;  
    user;
    diction: any;
    defualtDate = Date();
    procentSchow: Boolean = false;
    firstLoad: Boolean = false;

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
    tableDateColumns = []
    tableDateOptionsFilter = []; 

    typePeriudModel: Number;  

    arrVladelic = [];   
    vladelicModel: Number; 
    
    arrPostavschik = [];
    postavschikModel: Number;

    arrStatus = [];
    statusModel: Number;
    
    arrItemSize = [];    
    itemSizeModel: Number;    
    
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
    refreschData(e){
            this.defualtDate= e.defualtDate;
            this.typePeriudModel= e.typePeriudModel;
            this.vladelicModel= e.vladelicModel;
            this.postavschikModel= e.postavschikModel;
            this.statusModel= e.statusModel;
            this.itemSizeModel= e.itemSizeModel;
        this.getTabelData();
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
        this.service.getRashodstavokFull(param, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;  
                                this.noFixetColumns = [];
                                this.tableDateOptionsFilter = [];
                                let n = {
                                    kz: this.fixetColumns[0].header,    
                                    ru: this.fixetColumns[0].header,  
                                    en: this.fixetColumns[0].header                                 
                                }
                                this.tableDateOptionsFilter.push({id: 1, name: n});
                                n = {
                                    kz: this.fixetColumns[1].header,    
                                    ru: this.fixetColumns[1].header,  
                                    en: this.fixetColumns[1].header                                 
                                }
                                this.tableDateOptionsFilter.push({id: 2, name: n});
                                for (let i=0; i<data.сostElements.length; i++){                                    
                                    this.tableDateOptionsFilter.push({id: i+3, name: data.сostElements[i].name});
                                    if (this.userSetings.langId==0){
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.kz});  
                                    } 
                                    if (this.userSetings.langId==1){
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.ru});  
                                    } 
                                    if (this.userSetings.langId==2){
                                        this.noFixetColumns.push({field: data.сostElements[i].id, header: data.сostElements[i].name.en});   
                                    }  
                                }
                                this.initTableColumns();
                                data = data.data;
                                this.tableDate = this.inputTabelData(data, this.userSetings.langId);                                          
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
        let rData = [];
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
                 leaf: data[i].hasChild==0
             }
             rData.push(inData);
         }
         return rData;
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
    addChild(e){
        let param = {
            session: this.user.session,
            freightCarrier: this.vladelicModel,
            provider: this.postavschikModel,
            measure: this.itemSizeModel,
            status: this.statusModel,
            parent: e.data.id,
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
                                data = data.data; 
                                if (data.length>0){
                                    e.children = this.inputTabelData(data, this.userSetings.langId);
                                }   
                                delete e.leaf;                             
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
    getFirstTableData(){
        if (this.firstLoad){
            if (this.vladelicModel>0 && this.postavschikModel>0 && this.itemSizeModel>0 && this.statusModel>0 && this.typePeriudModel>0){
                this.getTabelData();
                this.firstLoad = false;
            }
        }
    }

    ngOnInit(){
        this.firstLoad = true;
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.storage.retrieve('userData');
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
        this.initTableColumns();
    }
}