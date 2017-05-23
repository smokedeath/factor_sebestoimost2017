import { Injectable } from "@angular/core";
import { Http } from "@angular/http"; 
//Jsonp, URLSearchParams,
// import { Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {    
    constructor(private http: Http) {}

    baseUrl = "http://192.168.1.20:51984/SpringCost";

    getPostavshikUslug(data) { //Возвращяет Поставщик Услуг
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




}