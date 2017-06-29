import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../../../../../share/app.service';
import { LeafletLayersModel } from './../../../../../../../../share/layers-map.model';
import { Dictionary } from './../../../../../../../../../assets/dictionary';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    moduleId: module.id,
    selector: 'vibor-marschruta-view-component',
    templateUrl: 'vibor-marschruta-view-component.html',
    styleUrls: ['vibor-marschruta-view-component.css']
})

export class ViborMarschrutaViewComponent implements OnInit {
    constructor(private service: AppService,
                private dictionary : Dictionary,
                private storage : LocalStorageService) {}
    
    userSetings;
    diction = [];
    distance: Number = 0;
    station1Model = 0;
    arrStation1 = [];
    station2Model = 0;
    arrStation2 = [];
    station3Model = 0;
    arrStation3 = [];

    //-------------------- MAP DATA --------------------------    
    jscoordinates = [];

	LAYER_OCM = {
		id: 'opencyclemap',
		name: 'Open Cycle Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {			
            minZoom:4,
            maxZoom: 7,
			attribution: 'Open Cycle Map'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: true,
		layer: L.tileLayer('http://appsrvtofi:51984/Tiles/{z}/{x}/{y}.png', {
                            minZoom:4,
                            maxZoom: 7,
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        })
	};
	circle = {
		id: 'circle',
		name: 'Circle',
		enabled: true,
		layer: L.circle([ 46.95, -122 ], { radius: 5000 })
	};
	polygon = {
		id: 'polygon',
		name: 'Polygon',
		enabled: true,
		layer: L.polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]])
	};
	square = {
		id: 'square',
		name: 'Square',
		enabled: true,
		layer: L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
	};
	marker = {
		id: 'marker',
		name: 'Marker',
		enabled: true,
		layer: L.marker([ 46.879966, -121.726909 ], {
			icon: L.icon({
				iconSize: [ 25, 41 ],
				iconAnchor: [ 13, 41 ],
				iconUrl: 'assets/marker-icon.png',
				shadowUrl: 'assets/marker-shadow.png'
			})
		})
	};
	geoJSON = {
            id: 'geoJSON',
            name: 'Geo JSON Polygon',
            enabled: true,
            layer: L.geoJSON(
                ({
                    type: 'Polygon',
                    coordinates:  [[
                            [ -121.6, 46.87 ],
                            [ -121.5, 46.87 ],
                            [ -121.5, 46.93],
                            [ -121.6, 46.87 ]
                        ]]
                }) as any,
                { style: () => { return { color: "#7990F3", weight: 7, opacity: 1 }; } })};  

    model = new LeafletLayersModel(
        [ this.LAYER_OSM, this.LAYER_OCM ],
        this.LAYER_OSM.id,
        [ this.circle, this.polygon, this.square, this.marker, this.geoJSON ]
    );

	layers: L.Layer[];
	layersControl: any;
    
    options = {
        layers: [
            L.tileLayer('http://appsrvtofi:51984/Tiles/{z}/{x}/{y}.png', {
                            minZoom:4,
                            maxZoom: 7,
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        })
        ],
        zoom: 4,
        center: L.latLng({ lat: 49.4, lng: 67.1 })
    };
    //----------------------------------------------

    updateIdLang(){
        this.userSetings = this.storage.retrieve('UserSetings');
    }
    btnSearch(){
        this.distance = 2066.66;
    }
    
    onJsAfterget(){
        this.geoJSON = {
            id: 'geoJSON',
            name: 'Geo JSON Polygon',
            enabled: true,
            layer: L.geoJSON(
                ({
                    type: 'Polygon',
                    coordinates: [this.jscoordinates]
                }) as any,
                { style: () => { return { color: "#7990F3", weight: 7, opacity: 1 }; } })};              

        this.model = new LeafletLayersModel(
            [ this.LAYER_OSM, this.LAYER_OCM ],
            this.LAYER_OSM.id,
            [ this.circle, this.polygon, this.square, this.marker, this.geoJSON ]
        );
    } 
    
	onApply() {
		// Get the active base layer
		let baseLayer = this.model.baseLayers.find((l) => { return l.id === this.model.baseLayer; });

		// Get all the active overlay layers
		let newLayers = this.model.overlayLayers
			.filter((l) => { return l.enabled; })
			.map((l) => { return l.layer; });
		newLayers.unshift(baseLayer.layer);

		this.layers = newLayers;
		this.layersControl = {
			baseLayers: {
				'Open Street Map': this.LAYER_OSM.layer,
				'Open Cycle Map': this.LAYER_OCM.layer
			},
			overlays: {
				Circle: this.circle.layer,
				Square: this.square.layer,
				Polygon: this.polygon.layer,
				Marker: this.marker.layer,
				GeoJSON: this.geoJSON.layer
			}
		};
		return false;
	} 

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
        this.service.loadUserSetings();
        this.userSetings = this.storage.retrieve('UserSetings');

        let dateInJson: any;
        this.onApply();  
        this.service.getMapRk()
                    .subscribe(data => {
                        dateInJson = data.json();   
                        dateInJson = dateInJson.geoData.features[0];                           
                        // geometry.push({type: 'LineString', coordinates: dateInJson.geometry.coordinates, properties: dateInJson.properties});   
                        this.jscoordinates = dateInJson.geometry.coordinates;  
                        this.onJsAfterget();                      
                        this.onApply();    
					});
    }
}