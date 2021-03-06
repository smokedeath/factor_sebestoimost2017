import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { SelectItem } from './interface.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Dictionary } from './../../assets/dictionary';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Injectable()
export class AppService {
    constructor(private http: Http,
                private storage : LocalStorageService,
                private dictionary : Dictionary,
                private router: Router,
                private _md5: Md5) {}

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
    arrLangs = [{id: 0,name: this.diction[108][0]},{id: 1,name: this.diction[108][1]},{id: 2,name: this.diction[108][2]}];

    newColumnsType = [
        {id: 1, type: 'Сумма нефексированных колонок'}
    ];

    cubRashodiParams = {
        tableX: 'do_1003',
        tableY: 'do_1002',
        sizeType :'measure',
        sizeName: 'dp_1003',
        data: 'data'
    }
    cubExplPokazParams = {
        tableX: 'dp_s',
        tableY: 'dp_1007',
        sizeType :'measure',
        sizeName: 'dp_1007',
        data: 'data'
    }
    cubExplPokazZavParams = {
        tableX: 'do_1003',
        tableY: 'dp_1008',
        sizeType :'measure',
        sizeName: 'dp_1008',
        data: 'data'
    }

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

        // url = "http://192.168.1.20:9595/toficost/a/" + moduleName + "/default/" + lang;
        url = "http://192.168.1.205:8080/wax/a/" + moduleName + "/default/" + lang;

        return url;
    }
    postSessionIn(data, moduleId, langId) { // Авторизация пользователя
        let apiUrl = "/session/sessionIn";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTest(data, moduleId, langId){ // Просто тест session
        let apiUrl = "/session/test";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    sessionOut(data, moduleId, langId){ // Закрытие сессии
        let apiUrl = "/session/sessionOut";
        let param = { session: data}
        let options = new RequestOptions({ params: param });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options);
    }
    saveSettings(data, moduleId, langId){ // Сохронение настроек программы
        let apiUrl = "/session/saveSettings";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    changeProfile(data, moduleId, langId){ // Изменения данных профиля пользователя
        let apiUrl = "/session/changeProfile";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    changePassword(data, moduleId, langId){ //Изменение пароля
        let apiUrl = "/session/changePassword";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCubeDimData(data, moduleId, langId){ //Выгрузка измерении куба с данными
        let apiUrl = "/cube/getCubeDimData";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getAllConst(data, moduleId, langId){ // Списки всех констант
        let apiUrl = "/catalog/getAllConst";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCubeValues(data, moduleId, langId){ // Полдучение куба
        let apiUrl = "/cube/getCubeValues";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }




    getGenPeriodList(data, moduleId, langId) {  //Тип периода
        let apiUrl = "/catalog/periodType";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getVladelic(data, moduleId, langId){ // Структурные подразделения
        let apiUrl = "/catalog/freightCarrier";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPostavschik(data, moduleId, langId){ //Поставщики данных
        let apiUrl = "/catalog/dataProvider";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getStatus(data, moduleId, langId) {  // Статусы данных
        let apiUrl = "/catalog/dataStatus";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getItemSize(data, moduleId, langId){  //Единицы измерения
        let apiUrl = "/catalog/currencyMeasure";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRashodiTable(data, moduleId, langId){  //РАСХОДЫ
        let apiUrl = "/rashodstavok/rashodi";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getExplpokazTable(data, moduleId, langId){  //Эксплуатационные показатели
        let apiUrl = "/rashodstavok/explpokaz";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getOtnesenierashodovZav(data, moduleId, langId){ //Отнесение Расходов - Зависящие расходы по расходным измерителям
        let apiUrl = "/rashodstavok/otnesenierashodovZav";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getOtnesenierashodovUsl(data, moduleId, langId){ //Отнесение Расходов - Условно-постоянные расходы по расходным измерителям
        let apiUrl = "/rashodstavok/otnesenierashodovUsl";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getOtnesenierashodovFull (data, moduleId, langId){ //Отнесение Расходов - Полные расходы по расходным измерителям
        let apiUrl = "/rashodstavok/otnesenierashodovFull";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRashodstavokZav (data, moduleId, langId){ //Расчет расходных ставок - Зависящие расходы по расходным измерителям
        let apiUrl = "/rashodstavok/rashodstavokZav";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRashodstavokUsl (data, moduleId, langId){ //Расчет расходных ставок - Условно-постоянные расходы по расходным измерителям
        let apiUrl = "/rashodstavok/rashodstavokUsl";
        let options = new RequestOptions({ params: data });
        return this.http.get(this.getBaseUrl(moduleId, langId) + apiUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRashodstavokFull (data, moduleId, langId){ //Расчет расходных ставок - Полные расходы по расходным измерителям
        let apiUrl = "/rashodstavok/rashodstavokFull";
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
    StringToObject(inData: String): Object{
        let data: Object = {};
        let arr = inData.split('&')
        for (let i=0; i<arr.length; i++){
            let dat = arr[i].split('=');
            if (dat[1]=='false' || dat[1]=='true')
                data[dat[0]] = (dat[1]=='true') ;
             else
                data[dat[0]] = dat[1];
        }
        return data;
    }
    getErrorFromData(data, sStr, eStr){
        let searchStr = data;
        let startStr = searchStr.indexOf(sStr);
        startStr = startStr + sStr.length;
        let endStr = searchStr.indexOf(eStr, startStr);
        let errorStr = searchStr.substr(startStr, endStr-startStr);
        return errorStr;
    }
    getMD5fromString(data){
        let hash = Md5.hashStr(data);
        return hash;
    }
    goToLogin(){
        this.router.navigate(["login"]);
    }
    getDataString(inData){
        let datepar = new Date(inData);
        let month: String;
        let day: String;
        let d = datepar.getDate();
        if (d<10){ day = '0' + d }else{ day = String(d)}
        let m = datepar.getMonth() + 1;
        if (m < 10){ month = '0' + m }else{ month = String(m)};
        let year = datepar.getFullYear();
        return year + "-" + month + "-" + day;
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
        this.storage.clear('md5');
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
    }
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
    calculateColumns(tableColumns, table){
         for (let i=0; i<table.length; i++){
             let data = table[i].data;
             for (let key in data){
                 let del=true;
                for (let a=0; a<tableColumns.length; a++){
                    if (tableColumns[a].field == key) del=false;
                }
                if (del) delete data[key];
             }
            if (table[i].children!=null) {
                table[i].children = this.calculateColumns(tableColumns, table[i].children);
            }
         }
        return table;
    }
    updateNewColumns(tableColumns, table){
        table = this.calculateColumns(tableColumns, table);
        for (let i=0; i<tableColumns.length; i++){
            if (tableColumns[i].type==1){
                for (let a=0; a<table.length; a++){
                    table[a] = this.getSumElementsFromTable(table[a], tableColumns[i]);
                }
            }
        }
        return table;
    }
    getSumElementsFromTable(table, colName){
        let sum=0;
        let data = table.data;
        for (let key in data){
           if (key!='id' && key!='name' && key!=colName.field){
               sum += data[key];
           }
        }
        let randNum = sum;
        let rounded = parseFloat(randNum.toFixed(2));
        data[colName.field] = rounded;
        table.data = data;
        if (table.children!=null) {
            for (let i=0; i<table.children.length; i++){
                table.children[i] = this.getSumElementsFromTable(table.children[i], colName);
            }
        }
        return table;
    }
    getPercentTable(table){
        for (let i=0; i<table.length; i++){
            let data = table[i].data;
            let sum = 0;
            for (let key in data){
                if (key!='id' && key!='name' && key.indexOf('newColmn')<0){
                    sum += data[key];
                }
            }
            for (let key in data){
                if (key!='id' && key!='name' && key.indexOf('newColmn')<0){
                    if (sum>0){
                      let randNum = data[key]/sum*100;
                      let rounded = parseFloat(randNum.toFixed(2));
                      data[key]=rounded+'%';
                    } else data[key]= '-';
                }
            }
            table[i].data = data;
            if (table[i].children!=null) table[i].children = this.getPercentTable(table[i].children);
        }
        return table;
    }
}
