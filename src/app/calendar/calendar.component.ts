import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { addDays, endOfMonth, startOfMonth } from 'date-fns';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    standalone: false
})
export class CalendarComponent  implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
    // Puedes agregar algunos eventos de ejemplo
    this.events = [
      {
        title: 'Evento de prueba',
        start: new Date(),
        end: addDays(new Date(), 1),
        allDay: true,
      }
    ];
  }
   // Método para cambiar entre vista diaria, mensual, semanal, etc.
   changeView(view: CalendarView) {
    this.view = view;
  }
}
