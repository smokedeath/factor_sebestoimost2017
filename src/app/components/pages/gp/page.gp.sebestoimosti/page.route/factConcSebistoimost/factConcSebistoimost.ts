import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'fact-conc-sebistoimost',
    templateUrl: 'factConcSebistoimost.html',
    styleUrls: ['factConcSebistoimost.css']
})

export class FactConcSebistoimostView implements OnInit {
    constructor(private service: AppService) { }
    
    vesgruza : boolean; 
    colvagonotvravki: boolean;
    contcount : boolean;
    ohranatruda : boolean;    
    showprogressmap : boolean;   
    koncretcalc : boolean;       
    searchmap: boolean;

    distance: number;

    selected = [];
    items = [];
    selectedOperation = [];
    arrUchastki = [];

    
    options = {
        layers: [
            L.tileLayer('http://appsrvtofi:51984/Tiles/{z}/{x}/{y}.png', {
                            minZoom:4,
                            maxZoom: 7,
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        })
        ],
        zoom: 4,
        center: L.latLng({ lat: 49.4, lng: 67.1 })
    };



    data = {
        selectedOperation: [],
        structureFirm: 4144,

        status: 1446,
        currentStatusValue: 1446,
        /* Поставщик услуг */
        providerOfServices: 4144,
        arrProviderOfServices: [],
        providerOfServicesAvalaibleOption: {},
        /* Услуга */
        usluga: 8296,
        arrUsluga: [],
        uslugaAvalaibleOption: {},
        /* Вид себестоимости */
        typeOfCost: 1446,
        arrTypeOfCost: [],
        typeOfCostAvalaibleOption: {},
        /* Тип себестоимости перевозки груза */
        currentCostType: 16105,
        costType: [],
        costTypeAvalaibleOption: {},
        /* Метод расчета */
        currentCalcMethod: 2794862,
        calcMethod: [],
        calcMethodAvalaibleOption: {},
        /* Учитывать план формирования */
        formingPlan: false,
        idStation: 0,
        /* Использовать расходные ставки */
        currentSuppliesRates: 16106,
        suppliesRates: [],
        suppliesRatesAvalaibleOption: {},
        /* Вычислять отсутствующие значения */
        isCalcMiss: false,
        /* Дата */
        currentDateValue: '2014-01-01',
        currentDateAngular: new Date("2014-01-01"),
        /* Тип периода */
        currentTypePeriod: 11,
        arrTypePeriod: [],
        typePeriodAvalaibleOption: {},
        /* Род груза */
        rodGruza: 1403,
        arrRodGruza: [],
        rodGruzaAvalaibleOption: {},
        /* Характеристика груза */
        haraktGruz: 1096,
        arrHaraktGruz: [],
        haraktGruzAvalaibleOption: {},
        /* Вид сообщения */
        vidSoob: 1003,
        arrVidSoob: [],
        vidSoobAvalaibleOption: {},
        /* Вид грузовой отправки */
        vidGruzOtpr: 1017,
        arrVidGruzOtpr: [],
        vidGruzOtprAvalaibleOption: {},
        /* Тип грузового вагона */
        typGpVagon: 1007,
        arrTypGpVagon: [],
        typGpVagonAvalaibleOption: {},
        /* Принадлежность вагона */
        prinadlVagon: 1139,
        arrPrinadlVagon: [],
        prinadlVagonAvalaibleOption: {},
        /* Тип контейнера */
        typCont: 1042,
        arrTypCont: [],
        typContAvalaibleOption: {},
        /* Принадежность контейнера */
        prinadlCont: 1100,
        arrPrinadlCont: [],
        prinadlContAvalaibleOption: {},
        /* Производится охрана груза */
        ohrana: false,
        /* Вес груза */
        vesGruz: 60,
        /* Количество вагонов в отправке */
        kolVagon: 1,
        /* Количество контейнеров */
        kolKont: 1,
        /* Модели данных для второго окна(Карта) */
        /* Станция отправления */
        startStantionId: null,
        endStationId: null,
        midStationId: 0,
        startStation: [],
        startStationAvalaibleOption: {},
        finishStationAvalaibleOption: {},
        middleStationAvalaibleOption: {},
        startCoord: [],
        finishCoord: [],
        middleCoord: [],
        /* Модели данных для третего окна  */
        kategGp: '',
        changeNumber: '',
        countGruzVag: '',
        countPorozhVag: '',
        probegSecond: '',
        probegHelp: '',
        tehSpeed: '',
        uchastSpeed: '',
        soprovoz: false,
        //Принадлежность инвентарного вагона
        prinadlInvVagon: null,
        arrPrinadlInvVagon: [],
        prinadlInvVagonContAvalaibleOption: {}
    };

    checked = false;

    ngOnInit(){
        let dateInJson: any;
        this.vesgruza = false;
        this.colvagonotvravki = false;
        this.contcount = true;
        this.ohranatruda = false;
        this.searchmap = true
        this.distance = 0;
        this.showprogressmap = false;

        //  Поставщики услуг
        this.service.postPostavshikUslug(this.data)
                    .subscribe(data => { 
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrProviderOfServices.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.providerOfServicesAvalaibleOption = {
                            id: this.data.arrProviderOfServices[0].id,
                            name: this.data.arrProviderOfServices[0].name
                        }       
                    })  

        // Услуга
        this.service.getUsluga()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrUsluga.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.uslugaAvalaibleOption = {
                            id: this.data.arrProviderOfServices[0].id,
                            name: this.data.arrProviderOfServices[0].name
                        }  
                    });
        // Вид себестоимости
        this.service.getSebistoimostVid()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrTypeOfCost.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.typeOfCostAvalaibleOption = {
                            id: this.data.arrTypeOfCost[0].id,
                            name: this.data.arrTypeOfCost[0].name
                        }  
                    });
        // Тип себестоимости перевозки груза  
        this.service.getTypSebestPerevozkiGruzi()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.costType.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.costTypeAvalaibleOption = {
                            id: this.data.costType[0].id,
                            name: this.data.costType[0].name
                        }  
                    });
        //Метод Расчета(Поставщики)
        this.service.getMetodRascheta()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.calcMethod.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.calcMethodAvalaibleOption = {
                            id: this.data.calcMethod[0].id,
                            name: this.data.calcMethod[0].name
                        }  
                    });
        //Использовать расходные ставки  
        this.service.getViRrahodStavki()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.suppliesRates.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.suppliesRatesAvalaibleOption = {
                            id: this.data.suppliesRates[0].id,
                            name: this.data.suppliesRates[0].name
                        }  
                    });
        //Тип периода
        this.service.getGenPeriodList()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrTypePeriod.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.typePeriodAvalaibleOption = {
                            id: this.data.arrTypePeriod[0].id,
                            name: this.data.arrTypePeriod[0].name
                        }  
                    });
        //Род груза
        this.service.getRodgruza()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrRodGruza.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.rodGruzaAvalaibleOption = {
                            id: this.data.arrRodGruza[0].id,
                            name: this.data.arrRodGruza[0].name
                        }  
                    });
        //Характеристика груза
        this.service.getHarakteristikaGruza()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrHaraktGruz.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.haraktGruzAvalaibleOption = {
                            id: this.data.arrHaraktGruz[0].id,
                            name: this.data.arrHaraktGruz[0].name
                        }  
                    }); 
        //Вид сообщения
        this.service.getVidsoobsheniya()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrVidSoob.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.vidSoobAvalaibleOption = {
                            id: this.data.arrVidSoob[0].id,
                            name: this.data.arrVidSoob[0].name
                        }  
                    });
        // Вид грузовой отправки
        this.service.getVidGruzotpravki()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrVidGruzOtpr.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.vidGruzOtprAvalaibleOption = {
                            id: this.data.arrVidGruzOtpr[0].id,
                            name: this.data.arrVidGruzOtpr[0].name
                        }  
                    });
        // Тип грузового вагона
        this.service.getTypGruzVagon()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrTypGpVagon.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.typGpVagonAvalaibleOption = {
                            id: this.data.arrTypGpVagon[0].id,
                            name: this.data.arrTypGpVagon[0].name
                        }  
                    });
        // Принадлежность вагона
        this.service.getPrinadlezhnostVagona()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrPrinadlVagon.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.prinadlVagonAvalaibleOption = {
                            id: this.data.arrPrinadlVagon[0].id,
                            name: this.data.arrPrinadlVagon[0].name
                        }  
                    });
        // Тип контейнера
        this.service.getTypKonteinera()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrTypCont.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.typContAvalaibleOption = {
                            id: this.data.arrTypCont[0].id,
                            name: this.data.arrTypCont[0].name
                        }  
                    });
        // Возвращяет список Принадлежность инвентарного вагона
        this.service.getPrinadlezhnostInventarnogoVagona()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrPrinadlInvVagon.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.prinadlInvVagonContAvalaibleOption = {
                            id: this.data.arrPrinadlInvVagon[0].id,
                            name: this.data.arrPrinadlInvVagon[0].name
                        }  
                    });
        // Принадлежность контейнера
        this.service.getPrinadlezhnostKonteinera()
                    .subscribe(data => {
                        dateInJson = data.json();
                        for (let i = 0; i<dateInJson.length; i++){
                            this.data.arrPrinadlCont.push({                        
                                name: dateInJson[i].name_ru,
                                id: dateInJson[i].id
                            });
                        }   
                        this.data.prinadlContAvalaibleOption = {
                            id: this.data.arrPrinadlCont[0].id,
                            name: this.data.arrPrinadlCont[0].name
                        }  
                    });
        // Загружает список раздельных пунктов для указания маршрута в ГП 
        // this.service.postLoadStations(this.data)
        //             .subscribe(data => {
        //                 dateInJson = data.json();

        //                 for (let i = 0; i<dateInJson.length; i++){
        //                     this.data.arrPrinadlCont.push({                        
        //                         name: dateInJson[i].name_ru,
        //                         id: dateInJson[i].id
        //                     });
        //                 }   
        //                 this.data.prinadlContAvalaibleOption = {
        //                     id: this.data.arrPrinadlCont[0].id,
        //                     name: this.data.arrPrinadlCont[0].name
        //                 }  
                        
        //             });


        // Данные по маршруту          
        // this.service.postPathMarshrut(this.data)
        //             .subscribe(data => {                         
        //                 dateInJson = data.json();
        //                 this.showprogressmap = false;
        //                 this.koncretcalc = false;
                        
        //                 this.distance = 0;//accounting.formatNumber(response.data.distance, 2, " ");

                        


        //             })  
    }    

    isChecked(){
        return this.selected.length === this.items.length;
    } 

    isIndeterminate(){
        return (this.selected.length !== 0 &&
        this.selected.length !== this.items.length);
    }

    toggleAll(arr: any[]){
        if (this.selected.length === this.items.length) {
            this.selected = [];
        } else if (this.selected.length === 0 || this.selected.length > 0) {
            this.selected = this.items.slice(0);
        }
    }

    editStMarshrut(index, item){
        //
    }
    
    genExcell(){
        // var data = {fileName: $scope.excellFileName};
        // var $iframe,
        //     iframe_doc,
        //     iframe_html;

        // if (($iframe = $('#download_iframe')).length === 0) {
        //     $iframe = $("<iframe id='download_iframe'" +
        //         " style='display: none' src='about:blank'></iframe>"
        //     ).appendTo("body");
        // }

        // iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
        // if (iframe_doc.document) {
        //     iframe_doc = iframe_doc.document;
        // }

        // iframe_html = "<html><head></head><body><form method='GET' action='"+RELIZADDRES+"/api/sebestoimost/getfile'>";



        // Object.keys(data).forEach(function (key) {
        //     iframe_html += "<input type='hidden' name='" + key + "' value='" + data[key] + "'>";

        // });

        // iframe_html += "</form></body></html>";

        // iframe_doc.open();
        // iframe_doc.write(iframe_html);
        // $(iframe_doc).find('form').submit();
    }  

}