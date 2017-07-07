import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from './../../../../share/app.service';
import { Dictionary } from './../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'explotation-pokaz-template-component',
    templateUrl: 'explotation-pokaz-template-component.html',
    styleUrls: ['explotation-pokaz-template-component.css']
})

export class ExplotationPokazTemplateComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}     
    
    @Input() userSetings=[];
    @Input() typePeriudModel: Number;
    @Input() arrtypePeriud=[];
    @Input() vladelicModel: Number;
    @Input() arrVladelic=[];
    @Input() defualtDate;
    @Input() noFixetColumns=[];
    @Input() tableDateOptions=[];
    @Input() tableDateColumns=[];
    @Input() tableDate=[];

    @Output() outAddChild: EventEmitter<any> = new EventEmitter();
    @Output() outUpdateTableColumns: EventEmitter<any> = new EventEmitter();
    @Output() outRefreschData: EventEmitter<any> = new EventEmitter(); 

    diction: any;    

    exportToExcell(){
        // new Angular2Csv(this.tableDate, 'My Report', options);
    }
    refreschData(){
        let data = {
            typePeriudModel: this.typePeriudModel,
            vladelicModel: this.vladelicModel,
            defualtDate: this.defualtDate
        }
        this.outRefreschData.emit(data);
    }    
    addChild(e){
        this.outAddChild.emit(e);
    }
    updateTableColumns(e){
        this.outUpdateTableColumns.emit(e);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
    }    
}