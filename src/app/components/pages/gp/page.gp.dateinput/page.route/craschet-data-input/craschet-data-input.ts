import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';
import { Dictionary } from './../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'craschet-data-input',
    templateUrl: 'craschet-data-input.html',
    styleUrls: ['craschet-data-input.css']
})

export class CraschetDataInputComponent implements OnInit{
    constructor(private service : AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService){}      

    titelName = 'ЗАГРУЗКА ДАННЫХ ИЗ Ц РАСЧЕТ';
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
    
    tableDate = [];    
    tableDateColumns = [
        {field:"seria", header:"Номер отправки", dataFilter: []} ,
        {field:"vid_plan", header:"Код экспедитора", dataFilter: []} ,
        {field:"vid_message", header:"Подкод экспедитора", dataFilter: []} ,
        {field:"id_admin_out", header:"Код экспедитора сопредельного государства", dataFilter: []} ,
        {field:"id_country_out", header:"Код дороги-составитель", dataFilter: []} ,
        {field:"date12", header:"Код дороги отправления", dataFilter: []} ,
        {field:"date_pogruz", header:"Код дороги назначения", dataFilter: []} ,
        {field:"id_nomenclature_grup", header:"Код страны отправления", dataFilter: []} ,
        {field:"id_gruz_out", header:"Код страны назначения", dataFilter: []} ,
        {field:"name_gruz_out", header:"Код станции отправления", dataFilter: []} ,
        {field:"id_gruz_in", header:"Код станции назначения", dataFilter: []} ,
        {field:"name_gruz_in", header:"Код станции входа", dataFilter: []} ,
        {field:"esrid_sttion_out", header:"Код станции выхода", dataFilter: []} ,
        {field:"id_country_in", header:"Дата отправления", dataFilter: []} ,
        {field:"id_road_in", header:"Дата входа", dataFilter: []} ,
        {field:"esp_id_station_in", header:"Дата выхода", dataFilter: []} ,
        {field:"id_gruz_etsng", header:"Номер вагона", dataFilter: []} ,
        {field:"id_grus_gng", header:"Принадлежность вагона", dataFilter: []} ,
        {field:"id_vagon_rod", header:"Номер контейнера", dataFilter: []} ,
        {field:"conteiner_type", header:"Принадлежность контейнера", dataFilter: []} ,
        {field:"vagon_prinadlezhnost", header:"Код груза ЕТ СНГ", dataFilter: []} ,
        {field:"conteiner_prinadlezhnost", header:"Код груза ГНГ", dataFilter: []} ,
        {field:"vagon_count", header:"Вес груза в кг", dataFilter: []} ,
        {field:"tonna_count", header:"Сумма в тенге", dataFilter: []} ,
        {field:"conteiner_count", header:"Код получателя", dataFilter: []} ,
        {field:"id_zhd_admin", header:"Вид отправки", dataFilter: []} 
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

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
            this.tableDateColumns = this.service.getTabelFilters(this.tableDate, this.tableDateColumns);
        });
    }
}