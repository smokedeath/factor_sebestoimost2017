import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'iodv-data-input',
    templateUrl: 'iodv-data-input.html',
    styleUrls: ['iodv-data-input.css']
})

export class IodvDataInput implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ ЕК ИОДВ';
    dopFiltr = false;
    tableFiltr = false;
    defualtDate = Date();
    langId: any;
    diction: any;
    visibleLabel: Boolean = false;

    //////////////////////////////
    arrAnyData = [];
    anyDataModel: Number;
    //////////////////////////////
    arrtypePeriud = [];
    typePeriudModel: Number;  

    arrDocVid = [];
    docVidModel: Number;
    
    tableDate = [];  
    tableDateColumns = [
        {
            field: "seria",
            header: "Серия и номер дорожного документа",
            dataFilter: []
        },
        {
            field: "datetime",
            header: "Время и дата отправления",
            dataFilter: []
        },
        {
            field: "out_stantion",
            header: "Станция отправления",
            dataFilter: []
        },
        {
            field: "in_stantion",
            header: "Станция назначения",
            dataFilter: []
        },
        {
            field: "message_type",
            header: "Вид сообщения",
            dataFilter: []
        },
        {
            field: "rod_gruza",
            header: "Род груза",
            dataFilter: []
        },
        {
            field: "gruz_weight",
            header: "Вес груза",
            dataFilter: []
        },
        {
            field: "output_type",
            header: "Вид отправки",
            dataFilter: []
        },
        {
            field: "vagon_count",
            header: "Количество вагонов",
            dataFilter: []
        },
        {
            field: "vagon_type",
            header: "Тип вагона",
            dataFilter: []
        },
        {
            field: "conteiner_type",
            header: "Тип контейнера",
            dataFilter: []
        },
        {
            field: "vagon_prinadlezhnost",
            header: "Принадлежность вагона",
            dataFilter: []
        },
        {
            field: "security",
            header: "Охраняемость",
            dataFilter: []
        },
        {
            field: "money",
            header: "доход с НДС, тенге",
            dataFilter: []
        },
        {
            field: "sost_tarif",
            header: "Состовляющие тарифа",
            dataFilter: []
        }
    ] 

    viewTemplateFolder(){
        //
    }
    inputFromTemplate(){
        //
    }
    exportToExcell(){
        //
    }

    updateIdLang(){
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
    }
    
    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        let userSetings = this.storage.retrieve('UserSetings');
        this.langId = userSetings.userLang;
        this.visibleLabel = userSetings.visibleLabel;
        if (this.langId == null){
            this.langId = 0;            
            this.storage.store('langId', this.langId);
        }
        // Загрузка по умолчанию (Пока нет api)
        this.arrAnyData = this.service.getAnyData();
        this.anyDataModel = this.arrAnyData[0].id;

        //Тип периода
        this.arrtypePeriud = this.service.getGenPeriodList();
        this.typePeriudModel = this.arrtypePeriud[2].id;
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

        this.arrDocVid = this.service.getDocVid();
        this.docVidModel = this.arrDocVid[0].id;

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
            this.tableDateColumns = this.service.getTabelFilters(this.tableDate, this.tableDateColumns);
        });

    }
}