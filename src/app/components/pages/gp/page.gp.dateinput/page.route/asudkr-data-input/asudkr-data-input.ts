import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'asudkr-data-input',
    templateUrl: 'asudkr-data-input.html',
    styleUrls: ['asudkr-data-input.css']
})

export class AsudkrDataInputComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}  

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ АСУ ДКР';
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
        {field:"seria", header:"Номер заявки", dataFilter: []} ,
        {field:"vid_plan", header:"Вид плана", dataFilter: []} ,
        {field:"vid_message", header:"Вид сообщения", dataFilter: []} ,
        {field:"id_admin_out", header:"Код жд администрации отправления", dataFilter: []} ,
        {field:"id_country_out", header:"Код страны отправления", dataFilter: []} ,
        {field:"date12", header:"Дата утверждения заявки ГУ-12 к перевозке", dataFilter: []} ,
        {field:"date_pogruz", header:"Предполагаемая дата погрузки", dataFilter: []} ,
        {field:"id_nomenclature_grup", header:"Код номенклатурной группы", dataFilter: []} ,
        {field:"id_gruz_out", header:"Код грузоотправителя", dataFilter: []} ,
        {field:"name_gruz_out", header:"Наименование грузоотправителя", dataFilter: []} ,
        {field:"id_gruz_in", header:"Код грузополучателя", dataFilter: []} ,
        {field:"name_gruz_in", header:"Наименование грузополучателя", dataFilter: []} ,
        {field:"esrid_sttion_out", header:"ЕСР-код станции отправления", dataFilter: []} ,
        {field:"id_country_in", header:"Код страны назначения", dataFilter: []} ,
        {field:"id_road_in", header:"Код дороги назначения", dataFilter: []} ,
        {field:"esp_id_station_in", header:"ЕСР-код станции назначения", dataFilter: []} ,
        {field:"id_gruz_etsng", header:"Код груза по ЕТСНГ", dataFilter: []} ,
        {field:"id_grus_gng", header:"Код груза по ГНГ", dataFilter: []} ,
        {field:"id_vagon_rod", header:"Код рода вагона", dataFilter: []} ,
        {field:"conteiner_type", header:"Тип контейнера", dataFilter: []} ,
        {field:"vagon_prinadlezhnost", header:"Принадлежность вагона", dataFilter: []} ,
        {field:"conteiner_prinadlezhnost", header:"Принадлежность контейнера", dataFilter: []} ,
        {field:"vagon_count", header:"Количество вагонов", dataFilter: []} ,
        {field:"tonna_count", header:"Количество тонн", dataFilter: []} ,
        {field:"conteiner_count", header:"Количество контейнеров", dataFilter: []} ,
        {field:"id_zhd_admin", header:"Код ЖД администрации", dataFilter: []} ,
        {field:"esp_world_in", header:"ЕСР-код межгосударственного стыкового пункта приема", dataFilter: []} ,
        {field:"esp_world_Out", header:"ЕСР-код межгосударственного стыкового пункта сдачи", dataFilter: []} ,
        {field:"Код ekspeditor_id", header:"Код экспедитора", dataFilter: []} ,
        {field:"ekspeditor_name", header:"Наименование экспедитора", dataFilter: []} ,
        {field:"other", header:"Примечание", dataFilter: []} 
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

        this.arrDocVid = this.service.getDocVidASUOIKDR();
        this.docVidModel = this.arrDocVid[0].id;

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();            
            this.tableDateColumns = this.service.getTabelFilters(this.tableDate, this.tableDateColumns);
        });

    }
}