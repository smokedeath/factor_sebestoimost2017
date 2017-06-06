import { OverlayPanel } from 'primeng/primeng';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'pageindexgp',
    templateUrl: 'page.index.gp.html',
    styleUrls: ['page.index.gp.css']
})

export class PageIndexGp {
    logoName = '../assets/admin/layout5/img/logo_gp_new.png';
    rExitLink = '/login'; ///login
    currentUser = "Габбасов Марс Беккалиевич";
    navbarLevel = 1;

    getPanel(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event);   
    }

    bigBatton = [
        {
            class: 'pricing__item',
            rlink: '/gp.date.input',
            name: 'загрузка данных',
            icon_type: 'cloud_download',
            label: 'Загрузка данных из информационных систем КТЖ'
        },
        {
            class: 'pricing__item',
            rlink: '/gp.rashodstavok',
            name: 'Расчет расходных ставок',
            icon_type: 'assignment',
            label: 'Расчет расходных ставок'
        },
        {
            class: 'pricing__item',
            rlink: '/gp.sebestoimosti',
            name: 'Расчет себестоимости',
            icon_type: 'monetization_on',
            label: 'Расчет себестоимости'
        },
        {
            class: 'pricing__item',
            rlink: '/gp.analiz',
            name: 'Анализ',
            icon_type: 'event_note',
            label: 'Анализ'
        },
        {
            class: 'pricing__item',
            rlink: '/index.gp',
            name: 'Расчет себестоимости отправок',
            icon_type: 'attach_money',
            label: 'Расчет себестоимости отправок'
        },
        {
            class: 'pricing__item',
            rlink: '/index.gp',
            name: 'Анализ отправок',
            icon_type: 'storage',
            label: 'Анализ отправок'
        }
    ];
}