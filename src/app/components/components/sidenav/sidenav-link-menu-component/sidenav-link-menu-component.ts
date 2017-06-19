import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Dictionary } from './../../../../../assets/dictionary';

@Component({
  moduleId: module.id,
  selector: 'sidenav-link-menu-component',
  templateUrl: 'sidenav-link-menu-component.html',
  styleUrls: ['sidenav-link-menu-component.css']
})
export class SidenavLinkMenuComponent implements OnInit{   
  constructor(private dictionary : Dictionary){}

  @Output()
  closeSide: EventEmitter<any> = new EventEmitter();

  @Input()
  smallMenu = []; 

  @Input()
  langId: any = 0;

  diction = [];

  
  closeSidClicke(){
      this.closeSide.emit(null);
  }

  ngOnInit(){
      this.diction = this.dictionary.dictionary;
  }

}
