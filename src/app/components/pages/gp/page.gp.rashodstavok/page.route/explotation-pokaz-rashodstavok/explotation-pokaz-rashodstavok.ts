import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'explotation-pokaz-rashodstavok',
    templateUrl: 'explotation-pokaz-rashodstavok.html',
    styleUrls: ['explotation-pokaz-rashodstavok.css']
})

export class ExplotationPokazRashodStavokComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
 
    diction = [];
    userSetings;
    user;
    firstLoad: Boolean = false;
    procentSchow: Boolean = false;
    defualtDate = Date();
    arrtypePeriud = [];
    tableDate = [];
    tableDateOptions = [];
    tableDateColumns = []; 
    tableDateOptionsFilter = [];

    fixetColumns = [
        {
            field: "name",
            header: "Наименование измерителей"
        },
        {
            field: "measure",
            header: "Единица измерения"
        }
    ];

    noFixetColumns = [];

    typePeriudModel: number;
    
    arrVladelic = [];
    vladelicModel: number; 

    arrGrupZnacheni = [];
    grupZnacheniModel: number;
           
    arrStatus = [];
    statusModel: number;

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    refreschData(e){
        this.typePeriudModel= e.typePeriudModel;
        this.vladelicModel= e.vladelicModel;
        this.defualtDate= e.defualtDate;

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
    getFirstTableData(){
        if (this.firstLoad){
            if (this.vladelicModel>0 && this.typePeriudModel>0){
                this.getTabelData();
                this.firstLoad = false;
            }
        }
    }
    getTabelData(){
        let param = {
            session: this.user.session,
            freightCarrier: this.vladelicModel,
            parent: 0,
            periodType: this.typePeriudModel,
            dte: this.service.getDataString(this.defualtDate)
        }
        // Таблица      
        this.service.getExplpokazTable(param, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.noFixetColumns = [];
                                for (let i=0; i<data.statuses.length; i++){
                                    if (this.userSetings.langId==0)
                                        this.noFixetColumns.push({field: data.statuses[i].id, header: data.statuses[i].name.kz});   
                                    if (this.userSetings.langId==1)
                                        this.noFixetColumns.push({field: data.statuses[i].id, header: data.statuses[i].name.ru});   
                                    if (this.userSetings.langId==2)
                                        this.noFixetColumns.push({field: data.statuses[i].id, header: data.statuses[i].name.en});     
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
    };
    inputTabelData(data, lang){        
        let rData = [];
         for (let i=0; i<data.length; i++){  
             let dat = {};           
             for (let key in data[i]){
                if (key!='id' && key!='name' && key!='measure'){
                    dat[key] = data[i][key];
                }else{
                    if (key=='id')dat[key] = data[i][key];
                    if (key=='name' || key=='measure'){
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
        for (let i=0; i<this.fixetColumns.length; i++){
            this.tableDateColumns.push({field: this.fixetColumns[i].field, header: this.fixetColumns[i].header});
        }
        for (let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateColumns.push({field: this.noFixetColumns[i].field, header: this.noFixetColumns[i].header});
        }
        for(let i=0; i<this.noFixetColumns.length; i++){    
            this.tableDateOptions.push({label: this.noFixetColumns[i].header, value: this.noFixetColumns[i], check: true});  
            let n = {
                kz: this.noFixetColumns[i].header,    
                ru: this.noFixetColumns[i].header,  
                en: this.noFixetColumns[i].header                                 
            } 
            this.tableDateOptionsFilter.push({id: i+3, name: n}); 
        }
    } 
    addChild(e){
        let param = {
            session: this.user.session,
            freightCarrier: this.vladelicModel,
            parent: e.data.id,
            periodType: this.typePeriudModel,
            dte: this.service.getDataString(this.defualtDate)
        }
        // Таблица      
        this.service.getExplpokazTable(param, this.user.programmId, this.userSetings.langId)
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
        this.initTableColumns();

    }

}