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
    @Input() tableDateOptionsFilter=[];

    @Output() outItemColumnSettingsChange: EventEmitter<any> = new EventEmitter();

    diction=[];
    arrSelectFilter=[];
    tableDateOptionsFilterModel: Number;
    showItemColumnSettingsModel: Boolean = false;
    showItemSizeSettingsModel: Boolean = false;
    showFiltersModel: Boolean = false;
    procentSchow: Boolean = false;
    checkAllColumns: Boolean = true;
    addNewColumnsModel: Boolean = false;
    selectFilterId: number = 0;
    newColumnModel:String = '';

    closeAll(){
        this.showItemColumnSettingsModel= false;
        this.showItemSizeSettingsModel= false;
        this.showFiltersModel= false;
        this.addNewColumnsModel= false;
    }
    addNewColumns(){
        //
    }
    showAddNewColumns(){
        this.addNewColumnsModel = !this.addNewColumnsModel;
    }
    selectColorColumns(){
        //
    }
    sortColumns(){
        //
    }
    selectFilter(e){
        this.tableDateOptionsFilterModel=0;
        this.selectFilterId++;
        this.arrSelectFilter.push({ id: this.selectFilterId, label: this.tableDateOptionsFilter[e-1].name, model: ''});
    }
    cancelFilter(){
        this.arrSelectFilter = [];
        this.tableDateOptionsFilterModel=0;
    }
    saveFilter(){
        this.closeAll();
    }
    showFilters(){
        this.showFiltersModel= !this.showFiltersModel;
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
    }
}