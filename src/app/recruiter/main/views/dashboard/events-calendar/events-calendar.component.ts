import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { AddCalendarEventComponent } from './add-calendar-event/add-calendar-event.component';
import { CalendarEventDetailsComponent } from './calendar-event-details/calendar-event-details.component';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss'],
})
export class EventsCalendarComponent implements OnInit, OnDestroy {
  @select((s) => s.calendarEventList.calendarEventList) calendarEventList$: any;
  events: any = [
    //   {border: "2px solid #4c6f35",
    //   color: "#4c6f35",
    //   cursor: "pointer",
    //   date: "2022-06-09",
    //   title: "First level interview"
    // }
    // {
    //   title: 'Code Challenge',
    //   date: '2022-05-31',
    //   color: '#D0EADB',
    //   border: '2px solid red',
    //   cursor: 'pointer'
    // },
    // {
    //   title: 'Technical Interview',
    //   date: '2022-05-31',
    //   color: '#D0EADB',
    //   border: '2px solid red',
    //   cursor: 'pointer'
    // },
  ];
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   events: this.events,
  //   eventClick: this.handleDateClick.bind(this),
  // };

  calendarOptions!: CalendarOptions;
  subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private _messengerSvc: MessengerService,
    private _identitySvc: IdentityService,
    private _calendarEventSvc: CalendarEventService
  ) {}

  ngOnInit(): void {
    this.onGetUserId();
    this.onGetCalendarEvents();

    let subscription = this._messengerSvc.getSubject().subscribe({
      next: (response: any) => {
        if (response) {
          this.onGetCalendarEvents();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetUserId() {
    let userId = this._identitySvc.getLoggedInUserData().Id;
    console.log('userId: ', userId);
    return userId;
  }

  onGetCalendarEvents() {
    // let subscription = this._calendarEventSvc
    //   .getCalendarEvents(this.onGetUserId())
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log('Event List Response: ', response);
    //       this.events = response;
    //       this.onFixEvents(this.events);
    //     },
    //     error: (err: any) => {
    //       console.warn('Error: ', err);
    //     },
    //   });
    // this.subscriptions.push(subscription);

    this._calendarEventSvc.LoadCalenderEvents(this.onGetUserId());
    let subscription = this.calendarEventList$.subscribe({
      next: (response: any) => {
        // console.log('Event List Response: ', response);
        this.events = response;
        this.onFixEvents(this.events);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);

    this._calendarEventSvc.LoadCalenderEvents(this.onGetUserId());
  }

  onFixEvents(Event: any) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: Event,
      eventClick: this.handleDateClick.bind(this),
    };
  }

  handleDateClick(arg: any) {
    // console.log('arg.event: ', arg.event);
    // console.log('arg.event.start: ', arg.event.start);
    // console.log('arg.event._def: ', arg.event._def);
    // console.log('arg.event._def.title: ', arg.event._def.title);
    // console.log('arg.event.extendedProps: ', arg.event.extendedProps);

    const event = {
      Id: arg.event.extendedProps.Id,
      title: arg.event._def.title,
      start: arg.event.start,
    };
    this.openDialog(event);
  }

  openDialog(event: any) {
    const dialogRef = this.dialog.open(CalendarEventDetailsComponent, {
      width: '700px',
      data: event,
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(AddCalendarEventComponent, {
      width: '100%',
      maxWidth: '500px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
