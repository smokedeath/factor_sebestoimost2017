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
    diction: any;
    userSetings;
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

        this.service.getIODVtable().subscribe(data => {
            this.tableDate = data.json();
            this.tableDateColumns = this.service.getTabelFilters(this.tableDate, this.tableDateColumns);
        });
    }
}