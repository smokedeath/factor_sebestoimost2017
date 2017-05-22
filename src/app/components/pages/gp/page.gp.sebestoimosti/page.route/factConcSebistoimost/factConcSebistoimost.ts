import { Component } from '@angular/core';
import {AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'fact-conc-sebistoimost',
    templateUrl: 'factConcSebistoimost.html',
    styleUrls: ['factConcSebistoimost.css']
})

export class FactConcSebistoimostView {
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

    getInitJ(){
        this.service.getPostavshikUslug(this.data).subscribe(
            response => this.items = response
        );          
       console.log(this.items); 
    }
}