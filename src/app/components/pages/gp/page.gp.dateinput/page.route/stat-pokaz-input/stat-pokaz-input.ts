import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'stat-pokaz-input',
    templateUrl: 'stat-pokaz-input.html',
    styleUrls: ['stat-pokaz-input.css']
})

export class StatPokazInputComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ЗАГРУЗКА СТАТИСТИЧЕСКИХ ПОКАЗАТЕЛЕЙ';
    defaultLabel = 'Статус';
    diction: any;
    userSetings;
    
    arrtypePeriud = [];
    tableDate = [];
    tableDateOptions = [];
    tableDateColumns = []; 
    
    fixetColumns = [
        {
            field: "name",
            header: "Наименование измерителей"
        },
        {
            field: "size",
            header: "Единица измерения"
        }
    ];

    noFixetColumns = [
        {
            field: "size",
            header: "План"
        },
        {
            field: "size",
            header: "Факт"
        }
    ];

    typePeriudModel: number;
    
    arrVladelic = [];
    vladelicModel: number; 

    arrGrupZnacheni = [];
    grupZnacheniModel: number;
           
    arrStatus = [];
    statusModel: number;

    inputFromTemplate(){
        ///
    }

    viewTemplateFolder(){
        //
    }

    exportToExcell(){
        let options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true, 
                showTitle: true 
            };
        // new Angular2Csv(this.tableDate, 'My Report', options);
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
        this.tableDateColumns = [];
        let user = this.storage.retrieve('userData');

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
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    

}