import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ScheduleInterview } from 'src/app/models/types/schedule-interview';
import { CalendarEventService } from 'src/app/services/calendar-event.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss'],
})
export class ScheduleInterviewComponent implements OnInit, OnDestroy {
  ScheduleInterviewForm!: FormGroup;
  updatedBy: any;
  loggedInUser: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    @Inject(MAT_DIALOG_DATA)
    public data: { candidateEmail: string; candidateId: string },
    private _calendarEventSvc: CalendarEventService,
    public dialogRef: MatDialogRef<ScheduleInterviewComponent>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.ScheduleInterviewForm = this._fb.group({
      Date: ['', Validators.required],
      Time: ['', Validators.required],
    });
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    return this.updatedBy;
  }

  ongetLoggedInUserData() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData();
    return this.loggedInUser.Id;
  }
  onSubmit() {
    let UserId = this.ongetLoggedInUserData();
    const Data: ScheduleInterview = {
      Title: 'Scheduled Interview with ' + this.data?.candidateEmail,
      Date: this.ScheduleInterviewForm.value.Date,
      Colour: 'rgb(208, 234, 219)',
      UpdatedByEmail: this.onGetUpdatedBy(),
      isInterview: true,
      InterviewMeetLink: '',
      InterviewEmailBody: '',
    };
    let subscription = this._calendarEventSvc
      .addInterviewSchedule(Data, UserId, this.data?.candidateId)
      .subscribe({
        next: (response: any) => {
          
        },
        error: (err: any) => {
          console.warn('Error: ', err);
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
