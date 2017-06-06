import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sidenav-link-menu-component',
  templateUrl: 'sidenav-link-menu-component.html',
  styleUrls: ['sidenav-link-menu-component.css']
})
export class SidenavLinkMenuComponent {
  @Input()
  smallMenu = []; 

}
