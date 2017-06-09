import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { SelectItem } from './../../../../../../share/interface.service';

@Component({
    moduleId: module.id,
    selector: 'iodv-data-input',
    templateUrl: 'iodv-data-input.html',
    styleUrls: ['iodv-data-input.css']
})

export class IodvDataInput implements OnInit{
    constructor(private service : AppService){}  

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ ЕК ИОДВ';
    dopFiltr = false;
    defualtDate = Date();

    seriaFilter: SelectItem[];
    //////////////////////////////
    arrAnyData = [];
    anyDataModel: Number;
    //////////////////////////////
    arrtypePeriud = [];
    typePeriudModel: Number;  

    arrDocVid = [];
    docVidModel: Number;
    
    tableDate = [];  
    tableDataFilter = [];  
    tableDateColumns = [
        {
            field: "seria",
            header: "Серия и номер дорожного документа"
        },
        {
            field: "datetime",
            header: "Время и дата отправления"
        },
        {
            field: "out_stantion",
            header: "Станция отправления"
        },
        {
            field: "in_stantion",
            header: "Станция назначения"
        },
        {
            field: "message_type",
            header: "Вид сообщения"
        },
        {
            field: "rod_gruza",
            header: "Род груза"
        },
        {
            field: "gruz_weight",
            header: "Вес груза"
        },
        {
            field: "output_type",
            header: "Вид отправки"
        },
        {
            field: "vagon_count",
            header: "Количество вагонов"
        },
        {
            field: "vagon_type",
            header: "Тип вагона"
        },
        {
            field: "conteiner_type",
            header: "Тип контейнера"
        },
        {
            field: "vagon_prinadlezhnost",
            header: "Принадлежность вагона"
        },
        {
            field: "security",
            header: "Охраняемость"
        },
        {
            field: "money",
            header: "доход с НДС, тенге"
        },
        {
            field: "sost_tarif",
            header: "Состовляющие тарифа"
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

    ngOnInit(){
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
            this.seriaFilter = [];
            for (let i=0;i < this.tableDate.length;i++){
                this.seriaFilter.push({label: this.tableDate[i].seria, value: this.tableDate[i].seria});
            }
            this.tableDataFilter = this.seriaFilter;
        });

    }
}