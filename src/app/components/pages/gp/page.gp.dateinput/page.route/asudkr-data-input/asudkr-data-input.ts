import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'asudkr-data-input',
    templateUrl: 'asudkr-data-input.html',
    styleUrls: ['asudkr-data-input.css']
})

export class AsudkrDataInputComponent implements OnInit{
    constructor(private service : AppService){}  

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ АСУ ДКР';
    dopFiltr = false;
    defualtDate = Date();
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
        {field:"seria", header:"Номер заявки"} ,
        {field:"vid_plan", header:"Вид плана"} ,
        {field:"vid_message", header:"Вид сообщения"} ,
        {field:"id_admin_out", header:"Код жд администрации отправления"} ,
        {field:"id_country_out", header:"Код страны отправления"} ,
        {field:"date12", header:"Дата утверждения заявки ГУ-12 к перевозке"} ,
        {field:"date_pogruz", header:"Предполагаемая дата погрузки"} ,
        {field:"id_nomenclature_grup", header:"Код номенклатурной группы"} ,
        {field:"id_gruz_out", header:"Код грузоотправителя"} ,
        {field:"name_gruz_out", header:"Наименование грузоотправителя"} ,
        {field:"id_gruz_in", header:"Код грузополучателя"} ,
        {field:"name_gruz_in", header:"Наименование грузополучателя"} ,
        {field:"esrid_sttion_out", header:"ЕСР-код станции отправления"} ,
        {field:"id_country_in", header:"Код страны назначения"} ,
        {field:"id_road_in", header:"Код дороги назначения"} ,
        {field:"esp_id_station_in", header:"ЕСР-код станции назначения"} ,
        {field:"id_gruz_etsng", header:"Код груза по ЕТСНГ"} ,
        {field:"id_grus_gng", header:"Код груза по ГНГ"} ,
        {field:"id_vagon_rod", header:"Код рода вагона"} ,
        {field:"conteiner_type", header:"Тип контейнера"} ,
        {field:"vagon_prinadlezhnost", header:"Принадлежность вагона"} ,
        {field:"conteiner_prinadlezhnost", header:"Принадлежность контейнера"} ,
        {field:"vagon_count", header:"Количество вагонов"} ,
        {field:"tonna_count", header:"Количество тонн"} ,
        {field:"conteiner_count", header:"Количество контейнеров"} ,
        {field:"id_zhd_admin", header:"Код ЖД администрации"} ,
        {field:"esp_world_in", header:"ЕСР-код межгосударственного стыкового пункта приема"} ,
        {field:"esp_world_Out", header:"ЕСР-код межгосударственного стыкового пункта сдачи"} ,
        {field:"Код ekspeditor_id", header:"Код экспедитора"} ,
        {field:"ekspeditor_name", header:"Наименование экспедитора"} ,
        {field:"other", header:"Примечание"} 
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

        this.arrDocVid = this.service.getDocVidASUOIKDR();
        this.docVidModel = this.arrDocVid[0].id;

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
        });

    }
}