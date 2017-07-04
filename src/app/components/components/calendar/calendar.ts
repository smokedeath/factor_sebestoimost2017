import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-calendar',
    templateUrl: 'calendar.html',
    styleUrls: ['calendar.css']
})

export class CalendarComponent implements OnInit{
    @Output()
    dateOut: EventEmitter<Date> = new EventEmitter(); 
       
    date = new Date();
    ru: any;
   
    getCrentDate(){
        this.dateOut.emit(this.date);
    }
    
    ngOnInit(){       
        let year = this.date.getFullYear()-1;
        this.date.setFullYear(year);
        this.ru = {
                    firstDayOfWeek: 0,
                    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                    dayNamesShort: ["Воск", "Пон", "Вто", "Сред", "Четв", "Пятн", "Суб"],
                    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
                    monthNamesShort: [ "Янв", "Фев", "Март", "Апр", "Май", "Июнь","Июль", "Авг", "Сен", "Окт", "Нояб", "Дек" ]
                };
    }
}
