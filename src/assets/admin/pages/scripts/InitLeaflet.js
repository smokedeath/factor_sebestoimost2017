/**
 * Created by Mullanur.Kazyyev on 13.12.2015.
 */


var LeafLetInit = function () {



    var map;


    var gpsMarker = [];




    var myStyleRazezd;

    var geojsonMarkerOptions;

    var arrGetMarsh = [];

    var geoStage = {};

    var ContextRazezd = {};

    var ContextArrRazezd = [];


    var distance = [];




    function unSelectStation() {


        gpsMarker.forEach(function(item){

            map.removeLayer(item);

        });



        ContextArrRazezd.forEach(function(item){

            map.removeLayer(item);



        });



        _.remove(gpsMarker);

        _.remove(arrGetMarsh);


        _.remove(ContextArrRazezd);

        ContextRazezd = {};

        _.remove(distance);






    }





    var leafletMain = function () {







        var tiles = L.tileLayer('http://appsrvtofi:51984/Tiles/{z}/{x}/{y}.png', {

                minZoom:4,
                maxZoom: 7,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),

            latlng = L.latLng(49.4, 67.1),
            southWest = L.latLng(62.14, 3.95),
            northEast = L.latLng(27.99, 131.83),
            bounds = L.latLngBounds(southWest, northEast);

        map = L.map('map', {center: latlng, zoom: 6, layers: [tiles],

            maxBounds: bounds,
            contextmenu: true,
            contextmenuWidth: 200,
            contextmenuItems: [

                {
                    text: 'Исходное положение',
                    icon: 'img/house.png',
                    callback: backHome
                }, '-',

                {
                    text: 'Показать координаты',
                    icon: 'img/coordination.png',
                    callback: showCoordinates
                },  {
                    text: 'Сделать центром карты',
                    icon: 'img/objective.png',
                    callback: centerMap
                }, '-',

                {
                    text: 'Приблизить',
                    icon: 'img/zoom-plus.png',
                    callback: zoomIn
                },

                {
                    text: 'Уменьшить',
                    icon: 'img/zoom-minus.png',
                    callback: zoomOut
                }

            ]
        });

        function showCoordinates(e) {

            $('#forcoordinate').text("Координаты: " + e.latlng);

            $('#coordination').modal('show');

        }


        function selectStation(e) {



            var myIcon = L.icon({
                iconUrl: 'img/gps.png',
                iconSize: [38, 38]

            });

            gpsMarker.push(L.marker(e.latlng, {icon: myIcon}).addTo(map));



            if (gpsMarker.length >= 2){


                $.ajax({
                    url: RELIZADDRES + '/api/sebestoimost/gp/koncretsebest/getpathmarshrut',
                    dataType: "json",
                    method: "POST",
                    data: {
                        currentDateValue: "2014-01-01",
                        formingPlan: false,
                        startStantionId: parseInt(_.first(arrGetMarsh)),
                        endStationId: parseInt(_.last(arrGetMarsh)),
                        usluga: 1
                    }

                }).done(function (data, status, jqXDR) {




                    distance.push(data.distance);

                    arrGetMarsh.shift();


                    $('#km').text(accounting.formatNumber(_.sum(distance), 2, " "));

                    var geometry = [];


                    data.stStage.data.forEach(function (item) {


                        _(geoStage.geoData.features).forEach(function (line) {


                            if (line.properties.obj == item.id) {


                                geometry.push({
                                    type: 'LineString',
                                    coordinates: line.geometry.coordinates,
                                    properties: line.properties
                                });


                            }


                        })


                    });


                    var myStyleRazezd2 = {
                        "color": "#21FFF3",
                        "weight": 7,
                        "opacity": 1
                    };






                    ContextRazezd = L.geoJson(geometry, {

                        style: myStyleRazezd2


                    });




                    map.addLayer(ContextRazezd);


                    ContextArrRazezd.push(ContextRazezd);


                }).fail(function (data, status, jqXDR) {


                });






            }



        }




        function centerMap(e) {
            map.panTo(e.latlng);
        }

        function zoomIn(e) {
            map.zoomIn();
        }

        function zoomOut(e) {
            map.zoomOut();
        }

        function backHome(e) {
            map.setView([49.4, 67.1], 6);
        }


        var Station, Razezd, RK;

        var assetLayerGroup = new L.featureGroup();


        $.ajax({
            url: RELIZADDRES + '/api/ks/getGeoRazdPunkt',
            dataType: "json",
            method: "POST",
            data: {currentDateValue: "2014-01-01"}
        }).done(function(data, status, jqXDR){


            data.geoData.features.forEach(function(item) {

                    if (item.properties.cls == 1077 || item.properties.cls == 1081) { // Откр, внутр, формир.

                        geojsonMarkerOptions = {
                            radius: 8,
                            fillColor: "#FFA500",
                            color: "#FFA500",
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.2
                        };
                    } else if (item.properties.cls == 1082) {  // Откр, внутр, неформир.

                        geojsonMarkerOptions = {
                            radius: 5,
                            fillColor: "#FFA500",
                            color: "#FFA500",
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.2
                        };
                    } else if (item.properties.cls == 1079 || item.properties.cls == 1086) { // Закр, внутр.

                        geojsonMarkerOptions = {
                            radius: 2,
                            fillColor: "#808080",
                            color: "#808080",
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.2
                        };
                    } else if (item.properties.cls == 1080 || item.properties.cls == 1087 || item.properties.cls == 1090) {  // Зак, стык.

                        geojsonMarkerOptions = {
                            radius: 2,
                            fillColor: "#ff69b4",
                            color: "#ff69b4",
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.2
                        };
                    } else if (item.properties.cls == 1078 || item.properties.cls == 1083 || item.properties.cls == 1084 || item.properties.cls == 1085) {  // Откр, стык.

                        geojsonMarkerOptions = {
                            radius: 8,
                            fillColor: "#ff69b4",
                            color: "#ff69b4",
                            weight: 5,
                            opacity: 1,
                            fillOpacity: 0.2
                        };
                    }

                    Station =  L.geoJson(item, {

                        onEachFeature: function (feature, layer) {

                           /* layer.bindContextMenu(
                                {
                                    contextmenu: true,
                                    contextmenuInheritItems: false,
                                    contextmenuWidth: 200,
                                    contextmenuItems: [{
                                        text: '<span style="color: #3366ff; "><b>' + feature.properties.name_ru + '</b></span>',
                                    }, '-', {
                                        text: 'Выбор',
                                        disabled: false,
                                        icon: 'img/selection.png',
                                        callback: selectStation
                                    }, {
                                        text: 'Отмена',
                                        disabled: false,
                                        icon: 'img/cancel.png',
                                        callback: unSelectStation
                                    }, '-', {
                                        text: 'Показать координаты',
                                        icon: 'img/coordination.png',
                                        callback: showCoordinates
                                    }]
                                }
                            );*/



                            layer.on('click',function(e){


                                this.openPopup();

                            });


                            layer.on('mouseover',function(e){


                                this.openPopup();

                            });


                            layer.on('contextmenu', function(e){



                                if (e.target.feature.properties.cls == 1079 || e.target.feature.properties.cls == 1086) { // Закр, внутр.

                                    showModalWindow("Ошибка!!!", "Вы выбрали закрытую станцию");

                                } else if (e.target.feature.properties.cls == 1080 || e.target.feature.properties.cls == 1087 || e.target.feature.properties.cls == 1090) {  // Зак, стык.

                                    showModalWindow("Ошибка!!!", "Вы выбрали закрытую станцию");

                                } else {


                                    arrGetMarsh.push(e.target.feature.properties.obj);



                                }

                            });

                            layer.bindPopup(feature.properties.name_ru);
                        },

                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        }

                    });


                Station.obj = item.properties.obj;

                    assetLayerGroup.addLayer(Station);

                    map.addLayer(assetLayerGroup);

                });

        }).fail(function(error){



        }).always(function(data, status, jqXDR){



        });


        $.ajax({
            url: RELIZADDRES + '/api/ks/getGeoStage',
            dataType: "json",
            method: "POST",
            data: {currentDateValue: "2014-01-01"}
        }).done(function(data, status, jqXDR) {


            geoStage = data;

            var geometry = [];

            myStyleRazezd = {
                "color": "#000",
                "weight": 7,
                "opacity": 1
            };

            data.geoData.features.forEach(function(item) {

                geometry.push({type: 'LineString', coordinates: item.geometry.coordinates, properties: item.properties});

            });

            Razezd = L.geoJson(geometry, {

                style: myStyleRazezd


            });

            map.addLayer(Razezd);
            map.addLayer(Razezd);

            map.fitBounds(Razezd.getBounds());

        }).fail(function(data, status, jqXDR){


        });


        $.ajax({
            url: RELIZADDRES + '/api/ks/getGeoRK',
            dataType: "json",
            method: "GET"
        }).done(function(data, status, jqXDR) {

            var geometry = [];

            var myStyle = {
                "color": "#7990F3",
                "weight": 7,
                "opacity": 1
            };

            data.geoData.features.forEach(function(item) {

                geometry.push({type: 'LineString', coordinates: item.geometry.coordinates, properties: item.properties});

            });

            RK =  L.geoJson(geometry, {

                style: myStyle,

                onEachFeature: function (feature, layer) {

                    layer.bindPopup('Границы Казахстана');

                }
            });

            map.addLayer(RK);

        }).fail(function(data, status, jqXDR){

        });


        $('#borderrk').on('click', function(){

            if(map.hasLayer(RK)){

                map.removeLayer(RK);

            }else{

                map.addLayer(RK);

            }
        });

        $('#razezd').on('click', function(){

            if(map.hasLayer(Razezd)){

                map.removeLayer(Razezd);

            }else{

                map.addLayer(Razezd);

            }
        });

        $('#station').on('click', function(){

            if(map.hasLayer(Station)){

                map.removeLayer(assetLayerGroup);

                legend.removeFrom(map);

            }else{

                map.addLayer(assetLayerGroup);
                legend.addTo(map);

            }
        });

        var legend = L.control({position: 'topright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');

            div.innerHTML = "<ul><li><img src=\"img/mapOrange.png\" height='20' width='20'> Открытые внутренние станции, где формируются поезда</li><li><img src=\"img/mapOrange.png\" width='15' height='15'>Открытые внутренние станции, где не формируются поезда</li><li><img src=\"img/mapPointPerple.png\" width='20' height='20'>Открытые стыковые станции</li><li><img src=\"img/mapPointPerple.png\" height='15' width='15'>Закрытые стыковые станции</li><li><img src=\"img/mapPointBlack.png\" height='15' width='15'>Закрытые внутренние станции</li></ul>" ;

            return div;
        };

        legend.addTo(map);

        map.on("zoomend", function (e) {

            if (map.getZoom() <= 5) {

                Razezd.setStyle({weight: 1});

                assetLayerGroup.setStyle({weight: 0})

            } else if (map.getZoom() <= 10) {

                Razezd.setStyle({weight: 4});

                assetLayerGroup.setStyle({weight: 4})

            } else {

                Razezd.setStyle({weight: 7});

                assetLayerGroup.setStyle({weight: 7})

            }
        });
    };


    return {





        removeAll: function(){


           unSelectStation();

        },


        returnMap: function(){

            return map;

        },




        init: function () {

            leafletMain();

        }

    };

}();






