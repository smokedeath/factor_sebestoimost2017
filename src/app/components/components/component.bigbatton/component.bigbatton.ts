import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'component-big-batton',
    templateUrl: 'component.bigbatton.html',
    styleUrls: ['component.bigbatton.css']
})

export class ComponentBigBatton{
    @Input()
    name: String = 'none';
    
    @Input()
    icon_type: String = 'cloud_download';
    
    @Input()
    label: String = 'Загрузка данных из информационных систем КТЖ';

    @Input()
    rlink: String = '/login'
}