import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';
import { TreeNode } from 'primeng/primeng';
import { TreeTabelDate } from './../../../../../../share/treeTabelDate.service';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-data-input.html',
    styleUrls: ['finance-data-input.css'],

})

export class FinanceDataInput implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  
    langId: any;
    diction: any;
    visibleLabel: Boolean = false;

    titelName = 'ЗАГРУЗКА ФИНАНСОВЫХ ДАННЫХ';
    defualtDate = Date();
    procentSchow: boolean = false;
    defaultLabel = "Элементы затрат:"; 
    filterColumnIdStatValue : TreeNode[];
    selectefilterColumnIdStatValue: TreeNode[];
    filterColumnNameStatValue : TreeNode[];
    selectefilterColumnNameStatValue: TreeNode[];

    arrtypePeriud = [];
    tableDate = [];
    FilterTableDate = [];
    tableDateOptions = [];

    fixetColumns = [
        {
            field: "id",
            header: "Номер статьи"
        },
        {
            field: "name",
            header: "Наименование статьи"
        }
    ];
    noFixetColumns = [
        {
            field: "size",
            header: "Расходы на оплату труда"
        },
        {
            field: "size",
            header: "Отчисления от фонда оплаты труда"
        },
        {
            field: "size",
            header: "Материалы"
        },
        {
            field: "size",
            header: "Топливо"
        },
        {
            field: "size",
            header: "Электроэнергия"
        },
        {
            field: "size",
            header: "Оплата работ сторонних организаций"
        },
        {
            field: "size",
            header: "Оплата работ дочерних предприятий"
        },
        {
            field: "size",
            header: "Износ средств"
        },
        {
            field: "size",
            header: "Прочие расходы"
        },
        {
            field: "size",
            header: "Сумма по элементам"
        }        
    ];

    tableDateColumns = []; 

    typePeriudModel: Number;  

    arrVladelic = [];   
    vladelicModel: Number; 
    
    arrPostavschik = [];
    postavschikModel: Number;

    arrStatus = [];
    statusModel: Number;
    
    arrItemSize = [];    
    itemSizeModel: Number;

    inputFromTemplate(){
        ///
    }
    onRefresch(){        
        this.FilterTableDate = [];
        for (let i=0; i<this.tableDate.length; i++) this.FilterTableDate.push(this.tableDate[i]);
    }
    exportToExcell(){
        //
    }
    viewTemplateFolder(){
        //
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
    searchFilter(id: Number): Boolean{
        let res: Boolean = false;
        for (let i=0; i< this.selectefilterColumnIdStatValue.length; i++){
            if (this.selectefilterColumnIdStatValue[i].label == id.toString()){
                res = true;
                break; 
            }
        }
        return res;
    }    
    filterTreeId(e){
        console.log(this.tableDate);
        this.FilterTableDate = [];
        for(let i=0; i<this.tableDate.length; i++){
            if(this.searchFilter(this.tableDate[i].data.id)){
                this.FilterTableDate.push(this.tableDate[i]);   //  {data: this.tableDate[i].data});
            }
        }
        console.log(this.FilterTableDate);
    }
    addChildDate(inDate: TreeTabelDate[]): any[]{
        let outDate = [];
        let children = [];
        for (let i=0; i<inDate.length; i++){
            let ch=0;
            if (inDate[i].children != null && inDate[i].children.length>0){
                ch=1;
                children = this.addChildDate(inDate[i].children);
            }
            if (ch==0)outDate.push({data: inDate[i].data});
            else outDate.push({data: inDate[i].data, children: children});
        }

        return outDate;
    }
    getChildDate(inDate: TreeNode[], typeColumn: Number): TreeNode[]{
        let outDate: TreeNode[];
        let children: TreeNode[];

        outDate = [];
        for (let i=0; i<inDate.length; i++){
            let ch = 0;          
            if (inDate[i].children != null && inDate[i].children.length>0){
                children = this.getChildDate(inDate[i].children, typeColumn);
                ch = 1;
            }             
            if (typeColumn==0){
                if (ch==0)outDate.push({  label: inDate[i].data.id });
                else outDate.push({label: inDate[i].data.id, children: children});
            }else{
                if (ch==0)outDate.push({  label: inDate[i].data.name });
                else outDate.push({label: inDate[i].data.name, children: children});
            }
        }
        return outDate;
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
        this. arrVladelic = this.service.getVladelic();
        this.arrPostavschik = this.service.getPostavschik();
        this.vladelicModel = this.arrVladelic[0].id;        
        this.postavschikModel = this.arrPostavschik[0].id; 
        this.arrItemSize = this.service.getItemSize();
        this.itemSizeModel = this.arrItemSize[0].id;

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
        //статусы
        this.arrStatus = this.service.getStatus();
        this.statusModel = this.arrStatus[0].id;
        // Таблица            
        this.service.getFinDataInput().subscribe(data => {
            this.tableDate = data.json().data
            this.filterColumnIdStatValue = [];
            let children: TreeNode[];
            this.filterColumnIdStatValue = this.getChildDate(this.tableDate, 0);
            this.filterColumnNameStatValue = this.getChildDate(this.tableDate, 1);
            for (let i=0; i<this.tableDate.length; i++) this.FilterTableDate.push(this.tableDate[i]);
        });
    }    

}