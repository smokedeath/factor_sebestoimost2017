import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http"; 
import { SelectItem } from './interface.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Dictionary } from './../../assets/dictionary';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {    
    constructor(private http: Http,
                private storage : LocalStorageService,
                private dictionary : Dictionary) {}
                
    diction = this.dictionary.dictionary;       
    
    userSetings = {
        langId: 0,
        visibleLabel: false 
    };      
    user = {
        email: '',
        login: 'sysadmin',
        name: '',
        phoneNumber: '',
        session: '',
        programmId: 0,
        userSetings: this.userSetings
    };
    arrLangs = [
        {
            id: 0,
            name: this.diction[108][0]
        },
        {
            id: 1,
            name: this.diction[108][1]
        },
        {
            id: 2,
            name: this.diction[108][2]
        }
    ];

    breadcrumb = [];
    sessionCookie = ''; 
    smallMenuGp = []; 
   
    baseUrl = "http://192.168.1.20:51984/SpringCost";

    getBaseUrl(moduleId, langId){
        let url = '';
        let moduleName = 'gp';
        let lang = 'kz';

        if (moduleId==1) moduleName = 'gp'; 
        if (moduleId==2) moduleName = 'mgs'; 

        if (langId==0) lang = 'kz';
        if (langId==1) lang = 'ru';
        if (langId==2) lang = 'en';

        url = "http://192.168.1.205:8080/wax/a/" + moduleName + "/default/" + lang + "/session";

        return url;
    }
    postSessionIn(data, moduleId, langId) { // Авторизация пользователя
        let apiUrl = "/sessionIn";  
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTest(data, moduleId, langId){ // Просто тест session
        let apiUrl = "/test"; 
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    sessionOut(data, moduleId, langId){ // Закрытие сессии
        let apiUrl = "/sessionOut";  
        let param = { session: data}
        let options = new RequestOptions({ params: param });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options);
    }
    saveSettings(data, moduleId, langId){ // Сохронение настроек программы
        let apiUrl = "/saveSettings"; 
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    changeProfile(data, moduleId, langId){ // Изменения данных профиля пользователя
        let apiUrl = "/changeProfile"; 
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
	    // let body = res.json();
        return res;
    }
    private handleError (error: Response | any) {
        return Observable.throw(error || error);
    }
    objecToString(obj: Object){
        let str: String = '';
        let q = [];
        for (let a in obj){
            q.push(a + '=' + obj[a]);
        }
        str = q.join('&');
        return str;
    }
    getErrorFromData(data, sStr, eStr){
        let searchStr = data;
        let startStr = searchStr.indexOf(sStr);
        startStr = startStr + sStr.length;
        let endStr = searchStr.indexOf(eStr, startStr);
        let errorStr = searchStr.substr(startStr, endStr-startStr);
        return errorStr;
    }

    loadUserSetings(){
        // Загрузка данных о настройках пользователя с сервера
            let user = this.storage.retrieve('userData');
            if (user == null) this.storage.store('userData', this.user);            
            this.user = this.storage.retrieve('userData');

            let userSetings = this.storage.retrieve('UserSetings');
            if (userSetings == null)this.storage.store('UserSetings', this.userSetings);                        
            this.userSetings = this.storage.retrieve('userData'); 
            this.user.userSetings = this.userSetings
    }

    clearProgrammSession(){        
        this.storage.clear('UserSetings');
        this.storage.clear('UserData');    
        this.userSetings = {
            langId: 0,
            visibleLabel: false 
        };      
        this.user = {
            email: '',
            login: 'sysadmin',
            name: '',
            phoneNumber: '',
            session: '',
            programmId: 0,
            userSetings: this.userSetings
        };
    }

    getSmalMenuGP(langId){
        this.smallMenuGp = [
            {
                rlink: '/gp.date.input',
                name: this.diction[3][langId],
                icon_type: 'cloud_download',
                label: this.diction[4][langId]
            },
            {
                rlink: '/gp.rashodstavok',
                name: this.diction[5][langId],
                icon_type: 'assignment',
                label: this.diction[5][langId]
            },
            {
                rlink: '/gp.sebestoimosti',
                name: this.diction[6][langId],
                icon_type: 'title',
                label: this.diction[6][langId]
            },
            {
                rlink: '/gp.analiz',
                name: this.diction[7][langId],
                icon_type: 'multiline_chart',
                label: this.diction[7][langId]
            },
            {
                rlink: '/index.gp',
                name: this.diction[8][langId],
                icon_type: 'directions_railway',
                label: this.diction[8][langId]
            },
            {
                rlink: '/index.gp',
                name: this.diction[9][langId],
                icon_type: 'equalizer',
                label: this.diction[9][langId]
            }
        ];
        return this.smallMenuGp;
    }

    getTabelFilters(tableDate: any[], tableDateColumns: any[]){
        let seriaFilter: SelectItem[];
        for (let i = 0; i < tableDateColumns.length; i++){
            seriaFilter = [];
            for (let a = 0; a < tableDate.length; a++ ){
                seriaFilter.push({label: tableDate[a][tableDateColumns[i].field], value: tableDate[a][tableDateColumns[i].field]});
            }
            tableDateColumns[i].dataFilter = seriaFilter;
        }
        return tableDateColumns;
    }
    // Карта РК
    getMapRk(){
        let apiUrl = "/api/ks/getGeoRK";
        return this.http.get(this.baseUrl + apiUrl);
    }
    getPeriodSebestoimost(){
        let priodList = [
            {id: 1, name: "Год"},
            {id: 2, name: "Полугодие"},
            {id: 3, name: "Квартал"}
        ]
        return priodList;

    }
    getSebestoimostFacGP(){        
        let factorTree =
                            [
                                {
                                    "label": "Тип тяги",
                                    "expandedIcon": "fa fa-list-ul",
                                    "collapsedIcon": "fa fa-list-ul",
                                    "children": [
                                            {
                                                "label": "электротяга",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "теплотяга",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            }
                                        ]
                                },
                                {
                                    "label": "Вид сообщения",
                                    "expandedIcon": "fa fa-list-ul",
                                    "collapsedIcon": "fa fa-list-ul",
                                    "children": [
                                            {
                                                "label": "внутриреспубликанское сообщение",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },            
                                            {
                                                "label": "импорт",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },            
                                            {
                                                "label": "экспорт",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },            
                                            {
                                                "label": "транзит",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            }
                                        ]
                                },
                                {
                                    "label": "Тип грузового вагона",
                                    "expandedIcon": "fa fa-list-ul",
                                    "collapsedIcon": "fa fa-list-ul",
                                    "children": [
                                            {
                                                "label": "полувагон",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "крытый вагон",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "цистерна",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "платформа",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "рефрижератор",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "прочий вагон",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "цементовозы",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "зерновозы",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "фитинговые платформы",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "минераловозы",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            },
                                            {
                                                "label": "транспортер",
                                                "expandedIcon": "fa fa-angle-double-right",
                                                "collapsedIcon": "fa fa-angle-double-right"
                                            }
                                        ]
                                }
                            ];
        return factorTree;
        // let apiUrl = "/api/sebestoimost/gp/getfacttree"; 
        // return this.http.get(this.baseUrl + apiUrl);
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
    getMetodSebestoimost(){
        let metod = [
            {id: 1, name: "Методика 1"},
            {id: 2, name: "Методика 2"},
            {id: 3, name: "Методика 3"}
        ];
        return metod;
    }
    getUslugaSebestoimost(){
        let usluga = [
            {id: 1, name: "Перевозка грузов"},
            {id: 2, name: "Перевозка порожних вагонов и других подвижных единиц"}
        ];
        return usluga;
    }

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
        // return this.http.get('https://api.myjson.com/bins/p7rnt');
        return this.http.get('https://api.myjson.com/bins/9fpa7');
    }   
    getIODVtable(){
        return this.http.get('https://api.myjson.com/bins/cvrxx');
    }
    getItemSize(){
        let itemSize = [
            {id: 1, name: "Тенге"},
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