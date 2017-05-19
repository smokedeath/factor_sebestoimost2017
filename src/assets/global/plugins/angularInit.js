/**
 * Created by Mullanur.Kazyyev on 11.12.2015.
 */






var RELIZADDRES = 'http://192.168.1.20:51984/SpringCost';

/**
 * Создаем приложение главное, подключили два модуля: Роутинг, ТриТаблицу
 */
var app = angular.module("myApp", ["ui.router", "oc.lazyLoad",
    "ngSanitize", "treeGrid", "ngMaterial", "md.data.table" ]);











app.config(function($mdDateLocaleProvider) {
    // Example of a French localization.
    $mdDateLocaleProvider.months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    $mdDateLocaleProvider.shortMonths = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    $mdDateLocaleProvider.days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    $mdDateLocaleProvider.shortDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 0;


});




app.factory('commonCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('common-cache');
}]);




app.service('testService', function($http){
    
    
    this.testGet= function(){
        
        
        var serviceResult;


       return $http.get(RELIZADDRES +  '/api/sebestoimost/genperiodlist')
            .success(function(data) {

                serviceResult = data;

            })
            .error(function(http, status, fnc, httpObj) {

               serviceResult = http;

            });
       
        
        
    };
    
    
    
    this.testPost = function(arg){


        var serviceResult;
        

      return $http.post("./albums.ms", arg)
            .success(function(data) {
                
                serviceResult = data;
               
            })
            .error(function(http, status, fnc, httpObj) {

                console.log('albums retrieval failed.',http,status,httpObj);
                
            });
       
        
        
        
    };
});








app.config(['$httpProvider', function ($httpProvider) {


    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $httpProvider.defaults.transformRequest =  function(obj) {
        var str = [];
        for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }



}]);





app.factory('settings', ['$rootScope', function($rootScope) {



    // supported languages
    var settings = {


        layout: {
            //pageSidebarClosed: false, // sidebar state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;







}]);




app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and angular css files
    });
}]);

app.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);



app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


    // Редирект, если человек ввел не правильный адрес
    $urlRouterProvider.otherwise("/");

    /**
     * GP Config for Controller
     */

    $stateProvider



/*
* расходные измерители
* */

        .state('menuItemFactRIValueGP', {
            url: "/factrivaluegp",
            templateUrl: "view/factrivaluegp.html",
            data: { pageTitle: 'Фактические расходные измерители'},
            controller: "FactRIValueGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/FactRIValueGPCtrl.js'


                        ]
                    }]);
                }]
            }
        })

        .state('menuItemPlanRIValueGP', {
            url: "/planrivaluegp",
            templateUrl: "view/planrivaluegp.html",
            data: { pageTitle: 'Плановые расходные измерители'},
            controller: "PlanRIValueGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/PlanRIValueGPCtrl.js'


                        ]
                    }]);
                }]
            }
        })

/*
* end расходные измерители
* */




        .state('menuItemContainersParams', {
            url: "/containerparams",
            templateUrl: "view/containerparams.html",
            data: {pageTitle: 'Параметры контейнеров'},
            controller: "ContainerParamsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            'controllers/ContainerParamsCtrl.js'


                        ]
                    }]);
                }]
            }
        })




         .state('menuItemFactRIGP', {
        url: "/factrigp",
        templateUrl: "view/factrigp.html",
        data: {pageTitle: 'Фактические расходы по расходным измерителям'},
        controller: "FactRIGPCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'myApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                    files: [




                        'controllers/FactRIGPCtrl.js'


                    ]
                }]);
            }]
        }
    })


        .state('menuItemPlanRIGP', {
            url: "/planrigp",
            templateUrl: "view/planrigp.html",
            data: { pageTitle: 'Плановые расходы по расходным измерителям'},
            controller: "PlanRIGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/PlanRIGPCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactEkspValGP', {
            url: "/factekspvalgp",
            templateUrl: "view/factekspvalgp.html",
            data: { pageTitle: 'Фактические статистические показатели'},
            controller: "FactEkspValGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/FactEkspValGPCtrl.js'


                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanEkspValGP', {
            url: "/planekspvalgp",
            templateUrl: "view/planekspvalgp.html",
            data: { pageTitle: 'Плановые статистические показатели'},
            controller: "PlanEkspValGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/PlanEkspValGPCtrl.js'


                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactRSGP', {
            url: "/factrsgp",
            templateUrl: "view/factrsgp.html",
            data: { pageTitle: 'Фактические расходные ставки'},
            controller: "FactRSGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            'controllers/FactRSGPCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanRSGP', {
            url: "/planrsgp",
            templateUrl: "view/planrsgp.html",
            data: {pageTitle: 'Плановые расходные ставки'},
            controller:"PlanRSGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            'controllers/PlanRSGPCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactCalcAverageSebestGP', {
            url: "/",
            templateUrl: "view/factcalcaveragesebestgp.html",
            data: { pageTitle: 'Расчёт фактической средней себестоимости'},
            controller: "FactCalcAverageSebestGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [







                             '../assets/global/plugins/fuelux/js/spinner.min.js',

                            '../assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            


                            '../assets/admin/pages/scripts/ui-tree.js',


                            'controllers/FactCalcAverageSebestGPCtrl.js'



                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanCalcAverageSebestGP', {
            url: "/plancalcaveragesebestgp",
            templateUrl: "view/plancalcaveragesebestgp.html",
            data: { pageTitle: 'Расчёт плановой средней себестоимости'},
            controller: "PlanCalcAverageSebestGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            '../assets/global/plugins/fuelux/js/spinner.min.js',

                            '../assets/global/plugins/jstree/dist/themes/default/style.min.css',






                            '../assets/admin/pages/scripts/ui-tree.js',


                            'controllers/PlanCalcAverageSebestGPCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactCalcKonkretSebestGP', {
            url: "/factcalckonkretsebestgp",
            templateUrl: "view/factcalckonkretsebestgp.html",
            data: { pageTitle: 'Расчёт фактической конкретной себестоимости'},
            controller: "FactCalcKonkretSebestGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [








                        '../assets/global/plugins/select2/select2.min.js',

                            '../assets/global/plugins/select2/select2.css',

                            "../assets/global/plugins/leaflet/leaflet.css",









                            '../assets/global/plugins/fuelux/js/spinner.min.js',








                            "../assets/admin/pages/scripts/InitLeaflet.js",


                            'controllers/FactCalcKonkretSebestGPCtrl.js'


                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanCalcKonkretSebestGP', {
            url: "/plancalckonkretsebestgp",
            templateUrl: "view/plancalckonkretsebestgp.html",
            data: { pageTitle: 'Расчёт плановой конкретной себестоимости'},
            controller: "PlanCalcKonkretSebestGPCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            '../assets/global/plugins/select2/select2.min.js',

                            '../assets/global/plugins/select2/select2.css',

                            "../assets/global/plugins/leaflet/leaflet.css",







                            '../assets/global/plugins/fuelux/js/spinner.min.js',







                            "../assets/admin/pages/scripts/InitLeaflet.js",


                           'controllers/PlanCalcKonkretSebestGPCtrl.js'

                        ]
                    }]);
                }]
            }
        })








        /**
         * MZHS Config for Controller
         */

        /*
         * расходные измерители
         * */

        .state('menuItemFactRIValueMZHS', {
            url: "/factrivaluemzhs",
            templateUrl: "view/factrivaluemzhs.html",
            data: { pageTitle: 'Фактические расходные измерители'},
            controller: "FactRIValueMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/FactRIValueMZHSCtrl.js'


                        ]
                    }]);
                }]
            }
        })

        .state('menuItemPlanRIValueMZHS', {
            url: "/planrivaluemzhs",
            templateUrl: "view/planrivaluemzhs.html",
            data: { pageTitle: 'Плановые расходные измерители'},
            controller: "PlanRIValueMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [




                            'controllers/PlanRIValueMZHSCtrl.js'


                        ]
                    }]);
                }]
            }
        })

        /*
         * end расходные измерители
         * */


        .state('menuItemFactRIMZHS', {
            url: "/factrimzhs",
            templateUrl: "view/factrimzhs.html",
            data: { pageTitle: 'Фактические расходы по расходным измерителям'},
            controller: "FactRIMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                           'controllers/FactRIMZHSCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanRIMZHS', {
            url: "/planrimzhs",
            templateUrl: "view/planrimzhs.html",
            data: { pageTitle: 'Плановые расходы по расходным измерителям'},
            controller: "PlanRIMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            'controllers/PlanRIMZHSCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactEkspValMZHS', {
            url: "/factekspvalmzhs",
            templateUrl: "view/factekspvalmzhs.html",
            data: { pageTitle: 'Фактические статистические показатели'},
            controller: "FactEkspValMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            'controllers/FactEkspValMZHSCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanEkspValMZHS', {
            url: "/planekspvalmzhs",
            templateUrl: "view/planekspvalmzhs.html",
            data: { pageTitle: 'Плановые статистические показатели'},
            controller: "PlanEkspValMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [



                            'controllers/PlanEkspValMZHSCtrl.js'


                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactRSMZHS', {
            url: "/factrsmzhs",
            templateUrl: "view/factrsmzhs.html",
            data: { pageTitle: 'Фактические расходные ставки'},
            controller: "FactRSMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [



                            'controllers/FactRSMZHSCtrl.js'


                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanRSMZHS', {
            url: "/planrsmzhs",
            templateUrl: "view/planrsmzhs.html",
            data: {pageTitle: 'Плановые расходные ставки'},
            controller: "PlanRSMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            'controllers/PlanRSMZHSCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactCalcAverageSebestMZHS', {
            url: "/factcalcaveragesebestmzhs",
            templateUrl: "view/factcalcaveragesebestmzhs.html",
            data: { pageTitle: 'Расчёт фактической средней себестоимости'},
            controller: "FactCalcAverageSebestMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            '../assets/global/plugins/fuelux/js/spinner.min.js',

                            '../assets/global/plugins/jstree/dist/themes/default/style.min.css',





                            '../assets/admin/pages/scripts/ui-tree.js',


                            'controllers/FactCalcAverageSebestMZHSCtrl.js'




                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanCalcAverageSebestMZHS', {
            url: "/plancalcaveragesebestmzhs",
            templateUrl: "view/plancalcaveragesebestmzhs.html",
            data: { pageTitle: 'Расчёт плановой средней себестоимости'},
            controller: "PlanCalcAverageSebestMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [



                            '../assets/global/plugins/fuelux/js/spinner.min.js',
                            '../assets/global/plugins/jstree/dist/themes/default/style.min.css',





                            '../assets/admin/pages/scripts/ui-tree.js',

                            'controllers/PlanCalcAverageSebestMZHSCtrl.js'
                        ]
                    }]);
                }]
            }
        })


        .state('menuItemFactCalcKonkretSebestMZHS', {
            url: "/factcalckonkretsebestmzhs",
            templateUrl: "view/factcalckonkretsebestmzhs.html",
            data: { pageTitle: 'Расчёт фактической конкретной себестоимости'},
            controller: "FactCalcKonkretSebestMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [



                            '../assets/global/plugins/select2/select2.css',
                            '../assets/global/plugins/select2/select2.min.js',

                            "../assets/global/plugins/leaflet/leaflet.css",


                            






                            "../assets/admin/pages/scripts/InitLeaflet.js",


                            'controllers/FactCalcKonkretSebestMZHSCtrl.js'

                        ]
                    }]);
                }]
            }
        })


        .state('menuItemPlanCalcKonkretSebestMZHS', {
            url: "/plancalckonkretsebestmzhs",
            templateUrl: "view/plancalckonkretsebestmzhs.html",
            data: { pageTitle: 'Расчёт плановой конкретной себестоимости'},
            controller: "PlanCalcKonkretSebestMZHSCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [


                            '../assets/global/plugins/select2/select2.css',
                            '../assets/global/plugins/select2/select2.min.js',









                            "controllers/PlanCalcKonkretSebestMZHSCtrl.js"

                        ]
                    }]);
                }]
            }
        })








}]);














app.controller('AppController', ['$scope', '$rootScope','$http', function($scope, $rootScope, $http ) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });



    $scope.people = [
        { name: 'Отправка####',img: 'img/sending.png' },
        { name: 'Отправка####',img: 'img/sending.png' },
        { name: 'Заявка####',img: 'img/receive.png' },
        { name: 'Отправка####',img: 'img/sending.png' }
    ];

    $scope.data = {


        structure:[
            {
                id:1,
                name:"Грузовой Перевозчик"
            },
            {
                id:2,
                name:"ДН-1 Акмола"
            },
            {
                id:3,
                name:"ДН-2 Костанай"
            },
            {
                id:4,
                name:"ДН-3 Павлодар"
            },
            {
                id:5,
                name:"ДН-4 Караганда"
            },
            {
                id:6,
                name:"ДН-5 ЗАЩИТА (К ДН-6 СЕМЕЙ)"
            },
            {
                id:7,
                name:"ДН-6 Семей"
            },
            {
                id:8,
                name:"ДН-7 Алматы"
            },

            {
                id:9,
                name:"ДН-8 Жамбыл"
            },
            {
                id:10,
                name:"ДН-9 Шымкент"
            },
            {
                id:11,
                name:"ДН-10 Кызыл-Орда"
            },
            {
                id:12,
                name:"ДН-11 Актобе"
            },
            {
                id:13,
                name:"ДН-12 Уральск"
            },
            {
                id:14,
                name:"ДН-13 Атырау"
            },
            {
                id:15,
                name:"НОД-14 Мангистау"
            },
            {
                id:16,
                name:"ДС Астана"
            },
            {
                id:17,
                name:"ДС Достык"
            },
            {
                id:18,
                name:"ДС Алтынколь"
            }

        ],
        structureAvalaibleOption:{
            id:1,
            name:"Грузовой Перевозчик"
        },
        currentstructureValue:1,
        thems :[
            {
                id:1,
                name: 'Фактические статистические показатели'

            },
            {
                id:2,
                name: 'Плановые статистические показатели'

            },
            {
                id:3,
                name: 'Фактические расходы по расходным измерителям'

            },
            {
                id:4,
                name: 'Плановые расходы по расходным измерителям'

            },
            {
                id:5,
                name: 'Фактические расходные ставки'

            },
            {
                id:6,
                name: 'Плановые расходные ставки'

            },
            {
                id:7,
                name: 'Расчёт фактической средней себестоимости'

            },
            {
                id:8,
                name: 'Расчёт плановой средней себестоимости'

            },
            {
                id:9,
                name: 'Расчёт фактической конкретной себестоимости'

            },
            {
                id:10,
                name: 'Расчёт плановой конкретной себестоимости'

            }

        ],
        themsAvalaibleOption:{
            id:1,
            name:"Фактические статистические показатели"
        },
        currentThemsValue:"Фактические статистические показатели",
        errorText:"",
        userName:""


    };


    $scope.$watch('data.structureAvalaibleOption', function (newvalue, oldvalue) {


        $scope.data.currentstructureValue = newvalue.id;


        if ($scope.data.currentstructureValue != 1 ){

            showModalWindow('Сообщение','Данные по   '+newvalue.name+'   отсутствуют' );





           

        }


    });


    $scope.$watch('data.themsAvalaibleOption', function (newvalue, oldvalue) {


        $scope.data.currentThemsValue = $('#feedbackform').data('id') +' - '+ newvalue.name;




    });


    $scope.$watch('data.errorText', function (newvalue, oldvalue) {


        $scope.data.errorText = newvalue;




    });

    $scope.$watch('data.userName', function (newvalue, oldvalue) {


        $scope.data.userName = newvalue;




    });





    $scope.Screenshot = function(){

        html2canvas(document.body, {
            onrendered: function(canvas) {


                $scope.data.errorImage = canvas.toDataURL("image/png");




                //ajax запрос на отправку к письму.






            }
        });


    };



    $scope.SendErrorReport = function(){

        html2canvas(document.body, {
            onrendered: function(canvas) {


                $scope.data.errorImage = canvas.toDataURL("image/png");




                //ajax запрос на отправку к письму.






            }
        });


        $http({
            url: RELIZADDRES + '/api/sebestoimost/sendMail',
            method: 'POST',
            data: {"json": JSON.stringify($scope.data)}
        }).then(function successCallback(response){




            if(response.data == 1){

                showModalWindow('Сообщение','Ваше сообщение доставлено. Спасибо за отзыв' );


            }








        }, function errorCallback(response) {


            showModalWindow('Сообщение','Сообщение не доставлено , проверьте ваше интернет соединение или попробуйте еще раз' );

        });



    };






}]);







////////////////////////////////////////////Cекция Ручной запуск аппа//////////////////////















app.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    

    
    
}]);

















/**
 *
 * @param title Заголовок модального окна
 * @param textMsg Текст сообщения модального окна
 */
var showModalWindow = function(title, textMsg){

    $('#fortitle').empty();
    $('#forcommonmsg').empty();





    $('#fortitle').text(title);
    $('#forcommonmsg').text(textMsg);








    $('#commonmsg').modal('show');




};






var refresherror = function(data){



    if (data.currentDateValue == "" || data.currentTypePeriod == undefined ){

        showModalWindow('Не выбрано одно из значений!', 'Выберите значение ...' )



    } else {


        return "ok"
    }


};
