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
    diction: any;
    userSetings;

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
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    
    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');
        // Загрузка по умолчанию (Пока нет api)
        this.arrAnyData = this.service.getAnyData();
        this.anyDataModel = this.arrAnyData[0].id;
        let user = this.storage.retrieve('userData');

        //Тип периода
        this.service.getGenPeriodList({session: user.session}, user.programmId, this.userSetings.langId)
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

        this.arrDocVid = this.service.getDocVid();
        this.docVidModel = this.arrDocVid[0].id;

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
            this.tableDateColumns = this.service.getTabelFilters(this.tableDate, this.tableDateColumns);
        });

    }
}