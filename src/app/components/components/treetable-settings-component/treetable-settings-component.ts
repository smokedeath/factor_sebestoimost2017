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
    @Input() arrItemSize = [];
    @Input() tableDateOptionsFilter=[];

    @Output() outItemColumnSettingsChange: EventEmitter<any> = new EventEmitter();
    @Output() outSizeModelUpdate: EventEmitter<any> = new EventEmitter();
    @Output() outProcent: EventEmitter<any> = new EventEmitter();

    diction=[];
    arrSelectFilter=[];
    arrSelectSort=[];
    tableDateOptionsFilterModel: Number;
    tableDateOptionsSortModel: Number;
    showItemColumnSettingsModel: Boolean = false;
    showItemSizeSettingsModel: Boolean = false;
    showSortTableModel: Boolean = false;
    showFiltersModel: Boolean = false;
    procentSchow: Boolean = false;
    checkAllColumns: Boolean = true;
    addNewColumnsModel: Boolean = false;
    selectFilterId: number = 0;
    selectSortId: number = 0;
    newColumnModel:String = '';

    arrNewColumnType = [];
    newColumnTypeModel: Number;
    newColumnArrNum = 0;
    newColumnArr = [];

    closeAll(){
        this.showItemColumnSettingsModel= false;
        this.showItemSizeSettingsModel= false;
        this.showFiltersModel= false;
        this.addNewColumnsModel= false;
        this.showSortTableModel=false;
    }
    addNewColumns(){
        if (this.newColumnModel != '' && this.newColumnTypeModel>0){
            this.newColumnArrNum++;
            this.newColumnArr.push({field: 'newColmn'+this.newColumnArrNum,
                                    header: {kz: this.newColumnModel,
                                            ru: this.newColumnModel,
                                            en: this.newColumnModel}, type: this.newColumnTypeModel});
            this.newColumnModel = '';
        }
        this.updateColumnsModel();
    }
    delNewColumns(field){
        let newarr = [];
        for (let i=0; i<this.newColumnArr.length; i++){
            if (this.newColumnArr[i].field!=field) newarr.push(this.newColumnArr[i]);
        }
        this.newColumnArr = newarr;
        this.updateColumnsModel();
    };
    showAddNewColumns(){
        this.addNewColumnsModel = !this.addNewColumnsModel;
    }
    selectColorColumns(){
        //
    }
    sortColumns(){
      this.showSortTableModel= !this.showSortTableModel;
    }
    sizeModelChenge(e, p){
        let model = {
            parentId: p,
            modelId: e
        }
        this.outSizeModelUpdate.emit(model);
    }
    selectFilter(e){
        this.tableDateOptionsFilterModel=0;
        this.selectFilterId++;
        this.arrSelectFilter.push({ id: this.selectFilterId, label: this.tableDateOptionsFilter[e-1].name, model: ''});
    }
    selectSort(e){
      this.tableDateOptionsSortModel=0;
      this.selectSortId++;
      this.arrSelectSort.push({ id: this.selectSortId, label: this.tableDateOptionsFilter[e-1].name, model: ''});
    }
    cancelFilter(){
        this.arrSelectFilter = [];
        this.tableDateOptionsFilterModel=0;
    }
    cancelSort(){
        this.arrSelectSort = [];
        this.tableDateOptionsSortModel=0;
    }
    saveFilter(){
        this.closeAll();
    }
    saveSort(){
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
        this.outProcent.emit(this.procentSchow);
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
        for (let i=0; i<this.newColumnArr.length; i++){
            this.noFixetColumns.push({field: this.newColumnArr[i].field, header: this.newColumnArr[i].header, type: this.newColumnArr[i].type});
        }
        this.outItemColumnSettingsChange.emit(this.noFixetColumns);
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.arrNewColumnType = [
            {id: 1, name:  {kz: this.diction[189][0], ru: this.diction[189][1], en: this.diction[189][2]}, typeColumn: 0}
        ];
    }
}
