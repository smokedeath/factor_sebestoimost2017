import { Injectable } from "@angular/core";
import { Jsonp, URLSearchParams, Http } from "@angular/http";
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {    
    constructor(private jsonp: Jsonp,
                private http: Http) {}

    baseUrl = "http://192.168.1.20:51984/SpringCost";

    
    getPostavshikUslug(data){
        let apiUrl = "/api/sebestoimost/gp/koncretsebest/postavshikuslug";   

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + apiUrl, data, options)
                .map(response => response.json())
                .catch(this.handleErrorObservable);
    } 
    
    private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }

}