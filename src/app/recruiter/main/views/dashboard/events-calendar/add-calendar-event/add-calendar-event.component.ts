import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { buildHashFromArray } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { CalendarEvent } from 'src/app/models/types/calendar-event';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_CALENDAR_EVENT,
  ADD_CALENDAR_EVENT_ERROR,
  ADD_CALENDAR_EVENT_SUCCESS,
} from 'src/STORE/_calendar.store/calendar.actions';

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.scss'],
})
export class AddCalendarEventComponent implements OnInit, OnDestroy {
  AddEventForm!: FormGroup;
  loggedInUser: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _calendarEventSvc: CalendarEventService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    public dialogRef: MatDialogRef<AddCalendarEventComponent>,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.AddEventForm = this._fb.group({
      Title: ['', Validators.required],
      Date: ['', Validators.required],
      Colour: ['', Validators.required],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  ongetLoggedInUserData() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData();
    console.log('loggedInUser: ', this.loggedInUser);
    return this.loggedInUser.Id;
  }
  onAddEvent() {
    this.ngRedux.dispatch({ type: ADD_CALENDAR_EVENT });
    console.log('AddEventForm: ', this.AddEventForm.value);
    const Payload: CalendarEvent = {
      Title: this.AddEventForm.value.Title,
      Date: this.AddEventForm.value.Date,
      Colour: this.AddEventForm.value.Colour,
      UpdatedByEmail: this.onGetUpdatedBy(),
    };

    let UserId = this.ongetLoggedInUserData();
    console.log('AddEventForm: ', Payload, UserId);

    let subscription = this._calendarEventSvc
      .addCalendarEvent(Payload, UserId)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this.ngRedux.dispatch({
              type: ADD_CALENDAR_EVENT_SUCCESS,
              payload: Payload,
            });
            this._messengerSvc.sendSubject('Event added!');
            this.closeDialog();
          }
        },
        error: (err: any) => {
          this.ngRedux.dispatch({
            type: ADD_CALENDAR_EVENT_ERROR,
            payload: err,
          });
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
