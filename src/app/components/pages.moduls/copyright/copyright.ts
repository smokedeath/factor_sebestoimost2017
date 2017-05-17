import {Component} from '@angular/core';


@Component({
  moduleId: module.id,  
  selector: 'copyright',
  templateUrl: 'copyright.html',
  styleUrls: ['copyright.css'],
})
export class Copyright {
  caption = '2017 © ТОО "Научно-исследовательский институт экономики и информатизации транспорта, телекоммуникаций"';
}