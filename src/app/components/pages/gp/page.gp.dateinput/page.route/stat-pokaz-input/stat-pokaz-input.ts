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
    langId: any;
    diction: any;
    visibleLabel: Boolean = false;
    
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
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
        if (this.langId == null){
            this.langId = 0;            
            this.storage.store('langId', this.langId);
        }
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
        // this.arrStatus = this.service.getStatus();
        // this.statusModel = this.arrStatus[0].id;

        this.arrVladelic = this.service.getVladelic();
        this.vladelicModel = this.arrVladelic[0].id;        

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
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {this.tableDate = data.json().data});
    }    

}