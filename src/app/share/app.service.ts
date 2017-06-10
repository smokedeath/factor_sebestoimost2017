import { Injectable } from "@angular/core";
import { Http } from "@angular/http"; 

@Injectable()
export class AppService {    
    constructor(private http: Http) {}
    
    user = {
        fam: 'Габбасов',
        name: 'Марс',
        otch: 'Беккалиевич',
        password: ''
    }

    smallMenuGp = [
        {
            rlink: '/gp.date.input',
            name: 'загрузка данных',
            icon_type: 'cloud_download',
            label: 'Загрузка данных из информационных систем КТЖ'
        },
        {
            rlink: '/gp.rashodstavok',
            name: 'Расчет расходных ставок',
            icon_type: 'assignment',
            label: 'Расчет расходных ставок'
        },
        {
            rlink: '/gp.sebestoimosti',
            name: 'Расчет себестоимости',
            icon_type: 'title',
            label: 'Расчет себестоимости'
        },
        {
            rlink: '/gp.analiz',
            name: 'Анализ',
            icon_type: 'multiline_chart',
            label: 'Анализ'
        },
        {
            rlink: '/index.gp',
            name: 'Расчет себестоимости отправок',
            icon_type: 'directions_railway',
            label: 'Расчет себестоимости отправок'
        },
        {
            rlink: '/index.gp',
            name: 'Анализ отправок',
            icon_type: 'equalizer',
            label: 'Анализ отправок'
        },
        {
            rlink: '/index.gp',
            name: 'Выход',
            icon_type: 'forward',
            label: 'Выход'    
        }
    ];



    baseUrl = "http://192.168.1.20:51984/SpringCost";
    // Карта РК
    getMapRk(){
        let apiUrl = "/api/ks/getGeoRK";
        return this.http.get(this.baseUrl + apiUrl);
    }
    postPostavshikUslug(data) { //Возвращяет Поставщик Услуг
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/postavshikuslug"; 
        return this.http.post(this.baseUrl + apiUrl, data);
    }  
    getUsluga() {  //Возвращяет Вид себестоимости
        let apiUrl = "/api/sebestoimost/gp/getcostkind"; 
        return this.http.get(this.baseUrl + apiUrl);
    }    
    getSebistoimostVid() {  //Возвращяет список видов себестоимости (факт, план, ...)
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/vidsebectoimosti"; 
        return this.http.get(this.baseUrl + apiUrl);    }  

    getTypSebestPerevozkiGruzi() {  //Возвращяет Тип себестоимости перевозки груза
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/typsebestperevozkigruza"; 
        return this.http.get(this.baseUrl + apiUrl);
    }  
    getMetodRascheta() {  //Возвращяет список Методов расчета
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/metodrascheta"; 
        return this.http.get(this.baseUrl + apiUrl);
    }  
    getViRrahodStavki() {  //Возвращяет список Вид расходной ставки
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/vidrahodstavki"; 
        return this.http.get(this.baseUrl + apiUrl);
    }  
    getGenPeriodList() {  //Тип периода
        let priodList = [
            {id: 1, name: "Год"},
            {id: 2, name: "Квартал"},
            {id: 3, name: "Месяц"}
        ]
        return priodList;
        // let apiUrl = "/api/sebestoimost/genperiodlist"; 
        // return this.http.get(this.baseUrl + apiUrl);
    } 
    getRodgruza() {  //Род груза
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/rodgruza"; 
        return this.http.get(this.baseUrl + apiUrl);
    }   
    getHarakteristikaGruza() {  //Характеристика груза
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/harakteristikagruza"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 
    getVidsoobsheniya() {  //Вид сообщения
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/vidsoobsheniya"; 
        return this.http.get(this.baseUrl + apiUrl);
    }   
    getVidGruzotpravki() {  // Вид грузовой отправки
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/vidgruzotpravki"; 
        return this.http.get(this.baseUrl + apiUrl);
    }  
    getTypGruzVagon() {  // Тип грузового вагона
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/typgruzvagon"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 
    getPrinadlezhnostVagona() {  // Принадлежность вагона
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/prinadlezhnostvagona"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 
    getTypKonteinera() {  // Тип контейнера
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/typkonteinera"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 
    getPrinadlezhnostInventarnogoVagona() {  // Возвращяет список Принадлежность инвентарного вагона
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/prinadlezhnostinventarnogovagona"; 
        return this.http.get(this.baseUrl + apiUrl);
    }  
    getPrinadlezhnostKonteinera() {  // Принадлежность контейнера
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/prinadlezhnostkonteinera"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 
    postPathMarshrut(data) { // Данные по маршруту   !!!!!!  НЕ РАБОТАЕТ !!!!!
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/getpathmarshrut"; 
        return this.http.post(this.baseUrl + apiUrl, data);
    } 
    postLoadStations(data) { // Загружает список раздельных пунктов для указания маршрута в ГП 
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/loadStations"; 
        return this.http.post(this.baseUrl + apiUrl, data);
    } 
    getStatus() {  // Генерирует статусы для комбобокса в расчете плановой себестоимости
        let statusList = [
            {id: 1, name: "Факт"},
            {id: 2, name: "План"}
        ];
        return statusList;
        // let apiUrl = "/api/sebestoimost/sredsebest/getstatus"; 
        // return this.http.get(this.baseUrl + apiUrl);
    } 

    ////////////////////
    ////////////////////
    getAnyData(){
        let anyData = [
            {id:1, name: "Данные 1"},
            {id:2, name: "Данные 2"},
            {id:3, name: "Данные 3"}
        ]
        return anyData;
    }
    /////////////////////   
    getDocVid(){
        let docVid = [
            {id: 1, name: "251"},            
            {id: 2, name: "253"}
        ]
        return docVid; 
    }    
    getDocVidASUOIKDR(){
        let docVid = [
            {id: 1, name: "Основной"},            
            {id: 2, name: "Дополнительный"}
        ]
        return docVid; 
    }  
    getFinDataInput() {
        return this.http.get('https://api.myjson.com/bins/p7rnt');
    }   
    getIODVtable(){
        return this.http.get('https://api.myjson.com/bins/cvrxx');
    }
    getItemSize(){
        let itemSize = [
            {id: 1, name: "одна тенге"},
            {id: 2, name: "тысяча тенге"},
            {id: 3, name: "милион тенге"}
        ];
        return itemSize;
    }
    getPostavschik(){
         let arrPostavschik = [{id: 1, name: "Поставщик"}];
         return arrPostavschik;
    }
    getGrupZnachen(){
        let arrGrupZnachen = [
                                {id: 1, name: "Измеритель 1"},
                                {id: 2, name: "Измеритель 2"},
                                {id: 3, name: "Измеритель 3"}
                            ];
        return arrGrupZnachen;
    }
    getGrupZnacheni(){
        let arrGrupZnacheni = [
                        {id: 1, name: "Группа измерителей",
                                option:[
                                    {id: 11, name: "Измеритель 1"},
                                    {id: 12, name: "Измеритель 2"},
                                    {id: 13, name: "Измеритель 3"}
                                ]
                        },
                        {id: 2, name: "Группа статистических показателей",
                                option:[
                                    {id: 21, name: "Статистический показатель 1"},
                                    {id: 22, name: "Статистический показатель 2"},
                                    {id: 23, name: "Статистический показатель 3"}
                                ]
                        },
                        {id: 3, name: "Группа доходных измерителей",
                                option:[
                                    {id: 31, name: "Доходный измеритель 1"},
                                    {id: 32, name: "Доходный измеритель 2"},
                                    {id: 33, name: "Доходный измеритель 3"}
                                ]
                        }
                      ];
        return arrGrupZnacheni;
    }

    getVladelic(){        
        let arrVladelic = [{id:1,name:"Грузовой Перевозчик"},{id:2,name:"ДН-1 Акмола"},{id:3,name:"ДН-2 Костанай"},{id:4,name:"ДН-3 Павлодар"},
                            {id:5,name:"ДН-4 Караганда"},{id:6,name:"ДН-5 ЗАЩИТА (К ДН-6 СЕМЕЙ)"},{id:7,name:"ДН-6 Семей"},{id:8,name:"ДН-7 Алматы"},
                            {id:9,name:"ДН-8 Жамбыл"},{id:10,name:"ДН-9 Шымкент"},{id:11,name:"ДН-10 Кызыл-Орда"},{id:12,name:"ДН-11 Актобе"},
                            {id:13,name:"ДН-12 Уральск"},{id:14,name:"ДН-13 Атырау"},{id:15,name:"НОД-14 Мангистау"},{id:16,name:"ДС Астана"},
                            {id:17,name:"ДС Достык"},{id:18,name:"ДС Алтынколь"}    
                          ];
        return arrVladelic;
    }




}