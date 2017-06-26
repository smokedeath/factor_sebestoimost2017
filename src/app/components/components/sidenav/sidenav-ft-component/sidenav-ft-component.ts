import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Dictionary } from './../../../../../assets/dictionary';
import { Message } from 'primeng/primeng';

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
  callFormStat: Boolean = false;
  errorText: String = '';
  msgs: Message[] = [];

  closeSidClicke(){
      this.closeSide.emit(null);
  }
  questionsClick(){    
    window.open('/sebestoimost_faq')
  }
  callToFactor(){
    this.callFormStat = !this.callFormStat;
    this.errorText = '';
  }
  sendError(){
    if (this.errorText.length>0){
      this.callFormStat = !this.callFormStat;
      this.showSuccess();
    }else{
      this.showWarn();
    }
  }
  showSuccess() {
      this.msgs = [];
      this.msgs.push({severity:'success', summary:this.diction[152][this.langId], detail:this.diction[153][this.langId]});
  }
  showWarn() {
      this.msgs = [];
      this.msgs.push({severity:'warn', summary:this.diction[152][this.langId], detail:this.diction[154][this.langId]});
  }

  ngOnInit() {
      this.diction = this.dictionary.dictionary;
  }
}
