import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'raskodstavok-template-component',
    templateUrl: 'raskodstavok-template-component.html',
    styleUrls: ['raskodstavok-template-component.css']
})

export class RaskodStavokTemplateComponent implements OnInit{      
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
    @Input() userSetings=[];
    @Input() typePeriudModel: Number;
    @Input() arrtypePeriud=[];
    @Input() vladelicModel: Number;
    @Input() arrVladelic=[];
    @Input() postavschikModel: Number;
    @Input() arrPostavschik=[];
    @Input() statusModel: Number;
    @Input() arrStatus=[];
    @Input() itemSizeModel: Number;
    @Input() arrItemSize=[];
    @Input() noFixetColumns=[];
    @Input() tableDateOptions=[];
    @Input() defualtDate;    
    @Input() tableDate=[];
    @Input() tableDateColumns=[];

    @Output() outProcent: EventEmitter<Boolean> = new EventEmitter();
    @Output() outUpdateTableColumns: EventEmitter<any> = new EventEmitter();
    @Output() outGetTabelData: EventEmitter<any> = new EventEmitter();

    diction: any;
    procentSchow: Boolean = false;

    summaryResult(){
        ///
    }
    exportToExcell(){
        //
    }
    refreschData(){
        let outModel = {
            defualtDate: this.defualtDate,
            typePeriudModel: this.typePeriudModel,
            vladelicModel: this.vladelicModel,
            postavschikModel: this.postavschikModel,
            statusModel: this.statusModel,
            itemSizeModel: this.itemSizeModel
        } 
        this.outGetTabelData.emit(outModel);
    }
    procentChang(){
        this.outProcent.emit(this.procentSchow);
    }
    updateTableColumns(e){
       this.outUpdateTableColumns.emit(e);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
    }
}