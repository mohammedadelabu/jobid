import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEventDetailsComponent } from './events-calendar/calendar-event-details/calendar-event-details.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { AddCalendarEventComponent } from './events-calendar/add-calendar-event/add-calendar-event.component'; // a plugin!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



@NgModule({
  declarations: [
    DashboardComponent,
    CalendarEventDetailsComponent,
    EventsCalendarComponent,
    AddCalendarEventComponent
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule,
  ]
})
export class DashboardModule { }
