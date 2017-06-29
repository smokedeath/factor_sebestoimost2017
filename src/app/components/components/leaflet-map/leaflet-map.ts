import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'leaflet-map',
    templateUrl: 'leaflet-map.html',
    styleUrls: ['leaflet-map.css']

})


export class LefletMap{      
    @Input()
    options = {};

    @Input()
    layers = {};
    
    @Input()
    layersControl = {}
}





// http://appsrvtofi:51984/Tiles/{z}/{x}/{y}.png