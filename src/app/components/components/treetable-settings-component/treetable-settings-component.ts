import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';

@Component({
    moduleId: module.id,
    selector: 'treetable-settings-component',
    templateUrl: 'treetable-settings-component.html',
    styleUrls: ['treetable-settings-component.css']
})

export class TreeTableSettingsComponent implements OnInit{      
    constructor(private dictionary : Dictionary){}  
    @Input() userSetings=[]; 
    @Input() tableDateOptions=[];  
    @Input() noFixetColumns=[];
    @Input() showpPocentButton: Boolean;
    @Input() itemSizeModel: Number;
    @Input() arrItemSize= [];

    @Output() outItemColumnSettingsChange: EventEmitter<any> = new EventEmitter();

    diction=[];
    showItemColumnSettingsModel: Boolean = false;
    showItemSizeSettingsModel: Boolean = false;
    procentSchow: Boolean = false;
    checkAllColumns: Boolean = true;

    showFilters(){
        //
    }
    showitemSize(){
        this.showItemSizeSettingsModel = !this.showItemSizeSettingsModel;
    }
    showItemColumnSettings(){
        this.showItemColumnSettingsModel = !this.showItemColumnSettingsModel;
    }
    procentChang(){
        this.procentSchow = !this.procentSchow;
    }
    onCheckAllColumns(){
        for (let i=0; i< this.tableDateOptions.length; i++) this.tableDateOptions[i].check=this.checkAllColumns;
        this.updateColumnsModel();
    }
    ItemColumnSettingsChange(){
        this.updateColumnsModel();
    } 
    updateColumnsModel(){  
        this.noFixetColumns = [];
        for (let i=0; i<this.tableDateOptions.length; i++){
            if (this.tableDateOptions[i].check)
                this.noFixetColumns.push({field: this.tableDateOptions[i].value.field, header: this.tableDateOptions[i].value.header});
            else this.checkAllColumns = false;      
        }      
        this.outItemColumnSettingsChange.emit(this.noFixetColumns);
    } 

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        console.log(this.tableDateOptions);
    }
}