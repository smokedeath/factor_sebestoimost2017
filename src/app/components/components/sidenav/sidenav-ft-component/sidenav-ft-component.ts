import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Dictionary } from './../../../../../assets/dictionary';

@Component({
  moduleId: module.id,
  selector: 'sidenav-ft-component',
  templateUrl: 'sidenav-ft-component.html',
  styleUrls: ['sidenav-ft-component.css']
})
export class SidenavFTComponent implements OnInit {
  constructor(private dictionary : Dictionary){}

  @Output()
  closeSide: EventEmitter<any> = new EventEmitter();

  @Input()
  langId: any = 0;

  diction = [];

  closeSidClicke(){
      this.closeSide.emit(null);
  }

  questionsClick(){    
    window.open('/sebestoimost_faq')
  }

  ngOnInit() {
      this.diction = this.dictionary.dictionary;
  }

}
