import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'singl-top-menu',
    templateUrl: 'singl.top.menu.html',
    styleUrls: ['singl.top.menu.css']
})

export class SinglTopMenu{ 
    @Input() 
    menu = [
        {
            name: "",
            subname: [
                {
                    name: "",
                    sref: ""
                }
            ]
        }
    ]; 
}