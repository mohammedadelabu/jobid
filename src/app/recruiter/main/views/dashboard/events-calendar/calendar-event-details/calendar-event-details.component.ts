import { NgRedux } from '@angular-redux/store';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_CALENDAR_EVENT,
  REMOVE_CALENDAR_EVENT_ERROR,
  REMOVE_CALENDAR_EVENT_SUCCESS,
} from 'src/STORE/_calendar.store/calendar.actions';

@Component({
  selector: 'app-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss'],
})
export class CalendarEventDetailsComponent implements OnInit, OnDestroy {
  Event: any;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Id: string; title: any; start: any },
    private _calendarEventSvc: CalendarEventService,
    private _messengerSvc: MessengerService,
    public dialogRef: MatDialogRef<CalendarEventDetailsComponent>,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    console.log('Calendar data: ', this.data);

    this.onGetEventData();
  }

  onGetEventData() {
    this.Event = {
      title: this.data?.title,
      start: this.data?.start,
    };
    console.log('this.Event: ', this.Event);
  }

  onRemoveEvent() {
    this.ngRedux.dispatch({ type: REMOVE_CALENDAR_EVENT });
    let subscription = this._calendarEventSvc
      .removeCalendarEvent(this.data?.Id)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this._messengerSvc.sendSubject('Event remove!');
            this.ngRedux.dispatch({
              type: REMOVE_CALENDAR_EVENT_SUCCESS,
              payload: response,
            });
            this.closeDialog();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: REMOVE_CALENDAR_EVENT_ERROR,
            payload: err,
          });
        },
      });
    this.subscriptions.push(subscription);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
