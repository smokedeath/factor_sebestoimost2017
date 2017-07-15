import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() userSetings = [];
    @Input() arrtypePeriud = [];
    @Input() arrVladelic = [];
    @Input() arrPostavschik = [];
    @Input() arrStatus = [];
    @Input() arrItemSize = [];
    @Input() typePeriudModel: Number;
    @Input() vladelicModel: Number;
    @Input() postavschikModel: Number;
    @Input() statusModel: Number;
    @Input() itemSizeModel: Number;
    @Input() defualtDate;
    @Input() tableDateOptionsFilter = [];
    @Input() tableDate = [];
    @Input() tableDatePercent = [];
    @Input() tableDateColumns = [];
    @Input() tableDateOptions = [];
    @Input() noFixetColumns = [];

    @Output() outUpdateTableColumns: EventEmitter<any> = new EventEmitter();
    @Output() outProcent: EventEmitter<Boolean> = new EventEmitter();
    @Output() outAddChild: EventEmitter<any> = new EventEmitter();
    @Output() outGetTabelData: EventEmitter<any> = new EventEmitter();
    @Output() outSizeModelUpdate: EventEmitter<any> = new EventEmitter();


    diction: any;
    procentSchow: Boolean = false;

    exportToExcell(){
        //
    }
    updateDate(e){
        this.defualtDate = e;
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
    addChild(e){
        this.outAddChild.emit(e);
    }
    updateTableColumns(e){
        this.outUpdateTableColumns.emit(e);        
    }
    sizeModelUpdate(e){
        this.outSizeModelUpdate.emit(e);
    }
    
    procentChang(e){
        this.procentSchow = e;
        this.outProcent.emit(e);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;  
    }
}