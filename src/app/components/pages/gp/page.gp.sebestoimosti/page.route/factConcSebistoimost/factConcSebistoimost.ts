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
    
    items: any;

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
        vidGruzOtprAvalaibleOption: [],
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
        let items: any;
        

        //  Поставщики услуг
        this.service.getPostavshikUslug(this.data)
                    .subscribe(data => { 
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.arrProviderOfServices.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.arrUsluga.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.arrTypeOfCost.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.costType.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.calcMethod.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.suppliesRates.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
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
                        items = data.json();
                        for (let i = 0; i<items.length; i++){
                            this.data.arrTypePeriod.push({                        
                                name: items[i].name_ru,
                                id: items[i].id
                            });
                        }   
                        this.data.typePeriodAvalaibleOption = {
                            id: this.data.arrTypePeriod[0].id,
                            name: this.data.arrTypePeriod[0].name
                        }  
                    });






    }     

}