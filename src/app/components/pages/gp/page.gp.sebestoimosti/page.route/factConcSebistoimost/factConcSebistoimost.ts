import { Component } from '@angular/core';
import { AppService } from './../../../../../../share/app.service';

@Component({
    moduleId: module.id,
    selector: 'fact-conc-sebistoimost',
    templateUrl: 'factConcSebistoimost.html',
    styleUrls: ['factConcSebistoimost.css']
})

export class FactConcSebistoimostView {
    constructor(private service: AppService) {}
    
    titelName = 'РАСЧЕТ КОНКРЕТНОЙ СЕБЕСТОИМОСТИ';  
    activTabPanel = 0;  

   handleChange(e) {
        this.activTabPanel = e.index;
   }

}