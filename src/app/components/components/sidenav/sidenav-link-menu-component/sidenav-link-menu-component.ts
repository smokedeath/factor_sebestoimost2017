import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sidenav-link-menu-component',
  templateUrl: 'sidenav-link-menu-component.html',
  styleUrls: ['sidenav-link-menu-component.css']
})
export class SidenavLinkMenuComponent {
  @Output()
  closeSide: EventEmitter<any> = new EventEmitter();

  @Input()
  smallMenu = []; 
  
  closeSidClicke(){
      this.closeSide.emit(null);
  }

}
