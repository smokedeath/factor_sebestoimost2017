import { Component } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'page-index-mzhs',
    templateUrl: 'page.index.mzhs.html',
    styleUrls: ['page.index.mzhs.css']
})

export class PageIndexMzhs{
    logoName = '../assets/admin/layout5/img/logo_mzhs_new.png';
    rExitLink = '/login'; ///login
    currentUser = "Габбасов Марс Беккалиевич";
    navbarLevel = 1;

    getPanel(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event);   
    }
    
    bigBatton = [ 
        {
            class: 'pricing__item',
            rlink: '/index.mzhs',
            name: 'загрузка данных',
            icon_type: 'cloud_download',
            label: 'Загрузка данных из информационных систем КТЖ'
        },
        {
            class: 'pricing__item',
            rlink: '/index.mzhs',
            name: 'Расчет расходных ставок',
            icon_type: 'assignment',
            label: 'Расчет расходных ставок'
        },
        {
            class: 'pricing__item',
            rlink: '/index.mzhs',
            name: 'Расчет себестоимости',
            icon_type: 'monetization_on',
            label: 'Расчет себестоимости'
        },
        {
            class: 'pricing__item',
            rlink: '/index.mzhs',
            name: 'Анализ',
            icon_type: 'event_note',
            label: 'Анализ'
        }
    ];    
}