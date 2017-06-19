import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sidenav-ft-component',
  templateUrl: 'sidenav-ft-component.html',
  styleUrls: ['sidenav-ft-component.css']
})
export class SidenavFTComponent implements OnInit {
  @Output()
  closeSide: EventEmitter<any> = new EventEmitter();

  closeSidClicke(){
      this.closeSide.emit(null);
  }

  questionsClick(){    
    window.open('/sebestoimost_faq')
  }

  ngOnInit() {
  }

}
