import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'craschet-data-input',
    templateUrl: 'craschet-data-input.html',
    styleUrls: ['craschet-data-input.css']
})

export class CraschetDataInputComponent implements OnInit{
    constructor(private service : AppService){}      

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ Ц РАСЧЕТ';
    dopFiltr = false;
    tableFiltr = false;
    defualtDate = Date();
    //////////////////////////////
    arrAnyData = [];
    anyDataModel: Number;
    //////////////////////////////
    arrtypePeriud = [];
    typePeriudModel: Number;  
    
    tableDate = [];    
    tableDateColumns = [
        {field:"seria", header:"Номер отправки"} ,
        {field:"vid_plan", header:"Код экспедитора"} ,
        {field:"vid_message", header:"Подкод экспедитора"} ,
        {field:"id_admin_out", header:"Код экспедитора сопредельного государства"} ,
        {field:"id_country_out", header:"Код дороги-составитель"} ,
        {field:"date12", header:"Код дороги отправления"} ,
        {field:"date_pogruz", header:"Код дороги назначения"} ,
        {field:"id_nomenclature_grup", header:"Код страны отправления"} ,
        {field:"id_gruz_out", header:"Код страны назначения"} ,
        {field:"name_gruz_out", header:"Код станции отправления"} ,
        {field:"id_gruz_in", header:"Код станции назначения"} ,
        {field:"name_gruz_in", header:"Код станции входа"} ,
        {field:"esrid_sttion_out", header:"Код станции выхода"} ,
        {field:"id_country_in", header:"Дата отправления"} ,
        {field:"id_road_in", header:"Дата входа"} ,
        {field:"esp_id_station_in", header:"Дата выхода"} ,
        {field:"id_gruz_etsng", header:"Номер вагона"} ,
        {field:"id_grus_gng", header:"Принадлежность вагона"} ,
        {field:"id_vagon_rod", header:"Номер контейнера"} ,
        {field:"conteiner_type", header:"Принадлежность контейнера"} ,
        {field:"vagon_prinadlezhnost", header:"Код груза ЕТ СНГ"} ,
        {field:"conteiner_prinadlezhnost", header:"Код груза ГНГ"} ,
        {field:"vagon_count", header:"Вес груза в кг"} ,
        {field:"tonna_count", header:"Сумма в тенге"} ,
        {field:"conteiner_count", header:"Код получателя"} ,
        {field:"id_zhd_admin", header:"Вид отправки"} 
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

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
        });
    }
}