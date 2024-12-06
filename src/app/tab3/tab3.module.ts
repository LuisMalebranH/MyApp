import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CalendarComponent } from 'src/app/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';  // Agregar CalendarModule aquí
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter,
      useFactory: adapterFactory,})  // Asegúrate de que CalendarModule se importe aquí
  ],
  declarations: [Tab3Page, CalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3PageModule {}