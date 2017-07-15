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
    @Input() tableDateOptionsSort=[];

    @Output() outItemColumnSettingsChange: EventEmitter<any> = new EventEmitter();
    @Output() outSizeModelUpdate: EventEmitter<any> = new EventEmitter();
    @Output() outProcent: EventEmitter<any> = new EventEmitter();

    sortType = [
      {id:1, name: {kz: 'По возрастанию', ru: 'По возрастанию', en: 'По возрастанию'}},
      {id:2, name: {kz: 'По убыванию', ru: 'По убыванию', en: 'По убыванию'}}
    ];

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
        this.tableDateOptionsFilter[e-1].disabled = true;
        this.arrSelectFilter.push({ id: this.tableDateOptionsFilter[e-1].id, label: this.tableDateOptionsFilter[e-1].name, model: ''});
    }
    selectSort(e){
      this.tableDateOptionsSortModel=0;
      this.tableDateOptionsSort[e-1].disabled = true;
      this.arrSelectSort.push({ id: this.tableDateOptionsSort[e-1].id, label: this.tableDateOptionsSort[e-1].name, model: 0});
    }
    cancelFilter(){
        this.arrSelectFilter = [];
        this.tableDateOptionsFilterModel=0;
        for (let i=0; i<this.tableDateOptionsFilter.length; i++) delete this.tableDateOptionsFilter[i].disabled;
    }
    cancelSort(){
        this.arrSelectSort = [];
        this.tableDateOptionsSortModel=0;
        for (let i=0; i<this.tableDateOptionsSort.length; i++) delete this.tableDateOptionsSort[i].disabled;
    }
    delColumnsSort(id){
        let newarr = [];
        for (let i=0; i<this.arrSelectSort.length; i++){
            if (this.arrSelectSort[i].id!=id) newarr.push(this.arrSelectSort[i]);
        }
        for (let i=0; i<this.tableDateOptionsSort.length; i++){
          if (this.tableDateOptionsSort[i].id==id) delete this.tableDateOptionsSort[i].disabled;
        }
        this.arrSelectSort = newarr;
    }
    delColumnsFilter(id){
        let newarr = [];
        for (let i=0; i<this.arrSelectFilter.length; i++){
            if (this.arrSelectFilter[i].id!=id) newarr.push(this.arrSelectFilter[i]);
        }
        for (let i=0; i<this.tableDateOptionsFilter.length; i++){
          if (this.tableDateOptionsFilter[i].id==id) delete this.tableDateOptionsFilter[i].disabled;
        }
        this.arrSelectFilter = newarr;
    };
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
