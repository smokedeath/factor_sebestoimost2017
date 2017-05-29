import { Injectable } from "@angular/core";
import { Http } from "@angular/http"; 

@Injectable()
export class AppService {    
    constructor(private http: Http) {}



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
        let apiUrl = "/api/sebestoimost/genperiodlist"; 
        return this.http.get(this.baseUrl + apiUrl);
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
        let apiUrl = "/api/sebestoimost/sredsebest/getstatus"; 
        return this.http.get(this.baseUrl + apiUrl);
    } 

    ////////////////////
    ////////////////////
    /////////////////////     
    getFinDataInput() {
        return this.http.get('https://api.myjson.com/bins/p7rnt');
    }   




}