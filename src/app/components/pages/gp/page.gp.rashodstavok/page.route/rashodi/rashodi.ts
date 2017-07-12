import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    templateUrl: 'rashodi.html',
    styleUrls: ['rashodi.css'],

})

export class RashodiComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}

    titelName = 'РАСХОДЫ';
    diction = [];
    constants = [];
    defualtDate = new Date();
    procentSchow: Boolean = false;
    firstLoad: Boolean = false;
    userSetings;
    user;
    tableY0 = [];
    tableYChild = {};
    coardinat=[];

    tableDate = [];
    tableDateOptions = [];

    fixetColumns = [{field:"id",header:{kz:'',ru:'',en:''}},{field:"id",header:{kz:'',ru:'',en:''}}];
    noFixetColumns = [];
    tableDateColumns = [];
    tableDateOptionsFilter = [];

    arrVladelic = [];
    vladelicModel;

    arrPostavschik = [];
    postavschikModel: Number;

    arrItemSize = [];
    arrItemSizeObj = {};
    itemSizeModel = [];

    arrtypePeriud = [];
    typePeriudModel: Number;

    arrStatus = [];
    statusModel: Number;

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    refreschData(e){
        this.defualtDate= e.defualtDate;
        this.typePeriudModel= e.typePeriudModel;
        this.vladelicModel= e.vladelicModel;
        this.postavschikModel= e.postavschikModel;
        this.statusModel= e.statusModel;
        this.itemSizeModel= e.itemSizeModel;
        if (this.vladelicModel >=0  && this.postavschikModel>0 && this.statusModel>0 && this.typePeriudModel>0)
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
            if (this.vladelicModel >=0  && this.postavschikModel>0 && this.statusModel>0 && this.typePeriudModel>0){
                this.getCube();
                this.firstLoad = false;
            }
        }
    }
    getIdByConst(inConst, data){
        let id = -1;
        for (let i=0; i<data.length; i++){
            if (data[i].own==inConst) id = i;
        }
        return id;
    }
    getCube(){
        let s = JSON.stringify([
                     {tableName:"freightCarrierDo",isRel:"1", ids:this.arrVladelic[this.vladelicModel].idName},
                     {tableName:"dp_q", ids: this.postavschikModel},
                     {tableName:"dp_s", ids: this.statusModel},
                     {tableName:"period", dte: this.service.getDataString(this.defualtDate), periodType: this.typePeriudModel.toString()}
                    ]);
        let data = {
            session: this.user.session,
            cubeId: 'rashodiCubes',
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
                                let sizeName = data[this.service.cubParams.sizeName];
                                for (let i=0; i<sizeName.length; i++){
                                    this.arrItemSizeObj[sizeName[i].measure].sizeName = sizeName[i].name;
                                }

                                this.arrItemSize = [];
                                for(let key in this.arrItemSizeObj) {
                                    this.arrItemSize.push(this.arrItemSizeObj[key]);
                                }

                                this.noFixetColumns = [];
                                let tableX = data[this.service.cubParams.tableX];
                                for (let i=0; i<tableX.length; i++){
                                    this.noFixetColumns.push({field: tableX[i].id, header: tableX[i].name});
                                }
                                this.initTableColumns();

                                let tableY = data[this.service.cubParams.tableY];
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
                if (this.coardinat[b][this.service.cubParams.tableY]==data[i].data.id){
                    for (let q=0; q<this.arrItemSize.length; q++){
                        if (this.arrItemSize[q].sizeParent==this.coardinat[b].measure){
                            for (let w=0; w<this.arrItemSize[q].size.length; w++){
                                if (this.arrItemSize[q].size[w].id==this.arrItemSize[q].sizeModel){
                                    let randNum = this.coardinat[b].valueNumb*this.arrItemSize[q].size[w].size;
                                    let rounded = parseFloat(randNum.toFixed(2));
                                    data[i].data[this.coardinat[b][this.service.cubParams.tableX]] = rounded;
                                }
                            }
                        }
                    }
                }
            }
        }
        return data;
    }
    sizeModelUpdate(e){
        for (let i=0; i<this.arrItemSize.length; i++){
            if (this.arrItemSize[i].sizeParent==e.parentId){
                this.arrItemSize[i].sizeModel=e.modelId;
            }
        }
        this.tableDate = this.updateCoardinateFormSizeModel(this.tableDate);
    }
    initTableColumns(){
        this.tableDateColumns = [];
        this.tableDateOptionsFilter = [];
        this.tableDateOptions = [];

        this.tableDateOptionsFilter.push({id: 1, name:  this.fixetColumns[0].header});
        this.tableDateOptionsFilter.push({id: 2, name: this.fixetColumns[1].header});
        for (let i=0; i<this.fixetColumns.length; i++){
            this.tableDateColumns.push({field: this.fixetColumns[i].field, header: this.fixetColumns[i].header});
        }
        for (let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateColumns.push({field: this.noFixetColumns[i].field, header: this.noFixetColumns[i].header});
        }
        for(let i=0; i<this.noFixetColumns.length; i++){
            this.tableDateOptions.push({label: this.noFixetColumns[i].header, value: this.noFixetColumns[i], check: true});
            this.tableDateOptionsFilter.push({id: i+3, name: this.noFixetColumns[i].header});
        }
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
    addChild(e){
        let data = [];
        let child = this.tableYChild[e.data.id];
        for (let i=0; i<child.length; i++)
            data.push(child[i]);
        e.children = this.inputTabelData(data, this.tableYChild);
        e.children = this.inputCoardinate(e.children);
        delete e.leaf;
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
        /////////////////// Сервисы ////////////////////
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
        this.service.getCubeDimData({session: this.user.session, cubeId: 'rashodiCubes', dimName: 'freightCarrierDo' }, this.user.programmId, this.userSetings.langId)
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
        // поставщики
        this.service.getCubeDimData({session: this.user.session, cubeId: 'rashodiCubes', dimName: 'dp_q' }, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                data = data[Object.keys(data)[0]]
                                this.arrPostavschik = [];
                                this.postavschikModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrPostavschik.push({id: data[i].id, name: data[i].name});
                                }
                                this.postavschikModel = this.constants['defProvider'].id;
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
        //статусы
        this.service.getCubeDimData({session: this.user.session, cubeId: 'rashodiCubes', dimName: 'dp_s' }, this.user.programmId, this.userSetings.langId)
                    .subscribe(
                        data => {
                            if (data.status==200){
                                data = data.json();
                                data = data.data;
                                data = data[Object.keys(data)[0]]
                                this.arrStatus = [];
                                this.statusModel = -1;
                                for (let i=0; i<data.length; i++){
                                    this.arrStatus.push({id: data[i].id, name: data[i].name});
                                }
                                this.statusModel = this.constants['defStatus'].id;
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
