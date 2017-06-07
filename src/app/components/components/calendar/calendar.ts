import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: 'calendar.html',
    styleUrls: ['calendar.css']
})

export class CalendarComponent implements OnInit{
    date = new Date();
    ru: any;

    ngOnInit(){
        this.ru = {
                    firstDayOfWeek: 0,
                    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                    dayNamesShort: ["Воск", "Пон", "Вто", "Сред", "Четв", "Пятн", "Суб"],
                    dayNamesMin: ["Во", "По", "Вт", "Ср", "Че", "Пя", "Су"],
                    monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
                    monthNamesShort: [ "Янв", "Фев", "Март", "Апр", "Май", "Июнь","Июль", "Авг", "Сен", "Окт", "Нояб", "Дек" ]
                };
    }

}