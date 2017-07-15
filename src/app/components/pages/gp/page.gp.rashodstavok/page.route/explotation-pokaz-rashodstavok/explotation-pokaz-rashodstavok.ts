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
    defualtDate = new Date();
    constants = [];
    arrtypePeriud = [];
    tableDate = [];
    tableDateOptions = [];
    tableDateColumns = [];
    tableDateOptionsFilter = [];
    tableDateOptionsSort = [];
    coardinat=[];
    tableY0 = [];
    tableYChild = {};

    fixetColumns = [{field:"id",header:{kz:'',ru:'',en:''}},{field:"id",header:{kz:'',ru:'',en:''}}];

    noFixetColumns = [];

    typePeriudModel: number;

    arrVladelic = [];
    vladelicModel: number;

    arrGrupZnacheni = [];
    grupZnacheniModel: number;

    arrStatus = [];
    statusModel: number;

    arrItemSize = [];
    arrItemSizeObj = {};
    itemSizeModel = [];

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    refreschData(e){
        this.typePeriudModel= e.typePeriudModel;
        this.vladelicModel= e.vladelicModel;
        this.defualtDate= e.defualtDate;

        this.getCube();
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
            if (this.vladelicModel>=0 && this.typePeriudModel>0){
                this.getCube();
                this.firstLoad = false;
            }
        }
    }
    getCube(){
        let s = JSON.stringify([
                     {tableNameConst:"explpokazGP",isRel:"1", ids:this.arrVladelic[this.vladelicModel].idName},
                     {tableNameConst:"period", dte: this.service.getDataString(this.defualtDate), periodType: this.typePeriudModel.toString()}
                    ]);
        let data = {
            session: this.user.session,
            cubeConst: 'explpokazCubes',
            filter: s
        }
        this.service.getCubeValues(data, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                this.coardinat = data.data;

                                this.arrItemSizeObj = {};
                                this.itemSizeModel = [];
                                let measure = data.measure;
                                for(let i=0; i<measure.length; i++){
                                    if (measure[i].parent==0) {
                                        this.arrItemSizeObj[measure[i].id] = {};
                                        this.arrItemSizeObj[measure[i].id].size = [];
                                        this.arrItemSizeObj[measure[i].id].sizeName = {};
                                        this.arrItemSizeObj[measure[i].id].sizeModel = measure[i].id;
                                        this.arrItemSizeObj[measure[i].id].sizeParent = measure[i].id;
                                        this.arrItemSizeObj[measure[i].id].size.push({id: measure[i].id,size: measure[i].kFromBase, name:  measure[i].name});
                                    }
                                }
                                for(let i=0; i<measure.length; i++){
                                    if (measure[i].parent!=0) {
                                        this.arrItemSizeObj[measure[i].parent].size.push({id: measure[i].id,size: measure[i].kFromBase, name:  measure[i].name});
                                    }
                                }
                                let sizeName = data[this.service.cubExplPokazParams.sizeName];
                                for (let i=0; i<sizeName.length; i++){
                                    if (this.arrItemSizeObj[sizeName[i].measure] !=null)
                                        this.arrItemSizeObj[sizeName[i].measure].sizeName = sizeName[i].nameMeasure;
                                }

                                this.arrItemSize = [];
                                for(let key in this.arrItemSizeObj) {
                                    this.arrItemSize.push(this.arrItemSizeObj[key]);
                                }
                                for (let i=0; i<this.arrItemSize.length; i++){
                                    let visible = true;
                                    let own = 0;
                                    if (this.arrItemSize[i].size.length<=1) visible = false;
                                    for (let a=0; a<this.arrItemSize[i].size.length; a++){
                                        if (own != this.arrItemSize[i].size[a].size){
                                            own = this.arrItemSize[i].size[a].size;
                                        }else visible = false;
                                    }
                                    this.arrItemSize[i].visible = visible;
                                }

                                this.noFixetColumns = [];
                                let tableX = data[this.service.cubExplPokazParams.tableX];
                                for (let i=0; i<2; i++){
                                    this.noFixetColumns.push({field: tableX[i].id, header: tableX[i].name});
                                }
                                this.initTableColumns();

                                let tableY = data[this.service.cubExplPokazParams.tableY];
                                this.tableY0 = [];
                                this.tableYChild = {};
                                for (let i=0; i<tableY.length; i++){
                                    if (tableY[i].parent==0){
                                        this.tableY0.push({id: tableY[i].id, name: tableY[i].name});
                                    }else{
                                        if (this.tableYChild[tableY[i].parent]==null) this.tableYChild[tableY[i].parent] = [];
                                        this.tableYChild[tableY[i].parent].push({id: tableY[i].id, name: tableY[i].name});
                                    }
                                }
                                this.tableDate = this.inputTabelData(this.tableY0, this.tableYChild);
                                this.tableDate = this.inputCoardinate(this.tableDate);
                                console.log('');
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
    }
    updateCoardinateFormSizeModel(data){
        data = this.inputCoardinate(data);
        for (let i=0; i<data.length; i++){
          if (data[i].children!=null){
              data[i].children = this.updateCoardinateFormSizeModel(data[i].children);
          }
        }
        return data;
    }
    inputCoardinate(data){
        for (let i=0; i<data.length; i++){
            for (let b=0; b<this.coardinat.length; b++){
                if (this.coardinat[b][this.service.cubExplPokazParams.tableY]==data[i].data.id){
                    for (let q=0; q<this.arrItemSize.length; q++){
                        if (this.arrItemSize[q].sizeParent==this.coardinat[b].measure){
                            for (let w=0; w<this.arrItemSize[q].size.length; w++){
                                if (this.arrItemSize[q].size[w].id==this.arrItemSize[q].sizeModel){
                                    let randNum = this.coardinat[b].valueNumb*this.arrItemSize[q].size[w].size;
                                    let rounded = parseFloat(randNum.toFixed(2));
                                    data[i].data[this.coardinat[b][this.service.cubExplPokazParams.tableX]] = rounded;
                                }
                            }
                        }
                    }
                }
            }
        }
        return data;
    }
    inputTabelData(data, child){
        let rData = [];
         for (let i=0; i<data.length; i++){
             let dat = {};
             for (let key in data[i]){
                if (key!='id'&&key!='name'){
                    dat[key] = data[i][key].value;
                }else{
                    if (key=='id')dat[key] = data[i][key];
                    if (key=='name') {
                        dat[key] = data[i][key].kz;
                    }
                }
             }
             let inData = {
                 data: dat,
                 leaf: child[data[i]['id']] == null
             }
             rData.push(inData);
         }
         return rData;
    }
    initTableColumns(){
        this.tableDateColumns = [];
        this.tableDateOptionsFilter = [];
        this.tableDateOptionsSort = [];
        this.tableDateOptions = [];

        this.tableDateOptionsFilter.push({id: 1, name:  this.fixetColumns[0].header, field: this.fixetColumns[0].field});
        this.tableDateOptionsFilter.push({id: 2, name: this.fixetColumns[1].header, field: this.fixetColumns[1].field});
        this.tableDateOptionsSort.push({id: 1, name:  this.fixetColumns[0].header, field: this.fixetColumns[0].field});
        this.tableDateOptionsSort.push({id: 2, name: this.fixetColumns[1].header, field: this.fixetColumns[1].field});
        for (let i=0; i<this.fixetColumns.length; i++){
            this.tableDateColumns.push({field: this.fixetColumns[i].field, header: this.fixetColumns[i].header});
        }
        for (let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateColumns.push({field: this.noFixetColumns[i].field, header: this.noFixetColumns[i].header});
        }
        for(let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateOptions.push({label: this.noFixetColumns[i].header, value: this.noFixetColumns[i], check: true});
            this.tableDateOptionsFilter.push({id: i+3, name: this.noFixetColumns[i].header, field: this.noFixetColumns[i].field});
            this.tableDateOptionsSort.push({id: i+3, name: this.noFixetColumns[i].header, field: this.noFixetColumns[i].field});
        }
    }
    sizeModelUpdate(e){
        for (let i=0; i<this.arrItemSize.length; i++){
            if (this.arrItemSize[i].sizeParent==e.parentId){
                this.arrItemSize[i].sizeModel=e.modelId;
            }
        }
        this.tableDate = this.updateCoardinateFormSizeModel(this.tableDate);
    }
    addChild(e){
        let data = [];
        let child = this.tableYChild[e.data.id];
        for (let i=0; i<child.length; i++)
            data.push(child[i]);
        e.children = this.inputTabelData(data, this.tableYChild);
        e.children = this.inputCoardinate(e.children);
        delete e.leaf;
    }
    getIdByConst(inConst, data){
        let id = -1;
        for (let i=0; i<data.length; i++){
            if (data[i].own==inConst) id = i;
        }
        return id;
    }

    ngOnInit(){
        let year = this.defualtDate.getFullYear()-1;
        this.defualtDate.setFullYear(year);
        this.firstLoad = true;
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        this.user = this.storage.retrieve('userData');
        this.fixetColumns = [
            {
                field: "id",
                header:  {kz: this.diction[187][0], ru: this.diction[187][1], en: this.diction[187][2]}
            },
            {
                field: "name",
                header:  {kz: this.diction[188][0], ru: this.diction[188][1], en: this.diction[188][2]}
            }
        ];
        // Списки всех констант
        this.service.getAllConst({session: this.user.session}, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                this.constants = data.data;
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
        // Структурные подразделения
        this.service.getCubeDimData({session: this.user.session, cubeConst: 'explpokazCubes', dimNameConst: 'explpokazGP' }, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                data = data[Object.keys(data)[0]]
                                this.arrVladelic = [];
                                this.vladelicModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrVladelic.push({id: i, name: data[i].name, idName: data[i].id});
                                }
                                this.vladelicModel = this.getIdByConst(this.constants['gpId'].id, data);
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
        this.service.getGenPeriodList({session: this.user.session}, this.user.programmId, this.userSetings.langId)
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
