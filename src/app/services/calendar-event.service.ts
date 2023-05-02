import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_CALENDAR_EVENT_LIST,
  FETCH_CALENDAR_EVENT_LIST_ERROR,
  FETCH_CALENDAR_EVENT_LIST_SUCCESS,
} from 'src/STORE/_calendar.store/calendar.actions';
import { CalendarEvent } from '../models/types/calendar-event';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventService implements OnDestroy {
  CalendarEventsUrl = environment.baseUrl + 'api/CalendarEvents/';
  GetCalendarEventsUrl = this.CalendarEventsUrl + 'GetCalendarEvents/';
  AddCalendarEventsUrl = this.CalendarEventsUrl + 'AddCalendarEvents/';
  UpdateCalendarEventUrl = this.CalendarEventsUrl + 'UpdateCalendarEvent/';
  RemoveCalendarEventUrl = this.CalendarEventsUrl + 'RemoveCalendarEvent/';

  subscriptions: Subscription[] = [];
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  addCalendarEvent(Event: CalendarEvent, UserId: string) {
    return this._http.post(`${this.AddCalendarEventsUrl}${UserId}`, Event);
  }

  addInterviewSchedule(
    Event: CalendarEvent,
    UserId: string,
    CandidateId: string
  ) {
    return this._http.post(
      `${this.AddCalendarEventsUrl}${UserId}?candidateId=${CandidateId}`,
      Event
    );
  }

  // getCalendarEvents(UserId: string): Observable<any> {
  //   return this._http.get<any>(`${this.GetCalendarEventsUrl}${UserId}`).pipe(
  //     map((response: any) => {
  //       console.log('map: ', response);
  //       let Data = [];

  //       for (let i = 0; i < response.Data.length; i++) {
  //         let data = {
  //           Id: response?.Data[i].EventId,
  //           title: response?.Data[i].Title,
  //           date: response?.Data[i].Date,
  //           color: response?.Data[i].Colour,
  //           border: `2px solid ${response?.Data[i].Colour}`,
  //           cursor: 'pointer',
  //           extra: {
  //             EventId: response?.Data[i].EventId,
  //             InterviewCandidateId: response?.Data[i].InterviewCandidateId,
  //             InterviewEmailBody: response?.Data[i].InterviewEmailBody,
  //             InterviewMeetLink: response?.Data[i].InterviewMeetLink,
  //             Title: response?.Data[i].Title,
  //             UpdatedByEmail: response?.Data[i].UpdatedByEmail,
  //             UpdatedDate: response?.Data[i].UpdatedDate,
  //             UserId: response?.Data[i].UserId,
  //             isInterview: response?.Data[i].isInterview,
  //           },
  //         };
  //         Data.push(data);
  //         console.log('map Data: ', Data);
  //       }

  //       return Data;
  //       // let data: any;
  //       // if (response) {
  //       //   data = {
  //       //     title: response?.Data[0].Title,
  //       //     date: response?.Data[0].Date,
  //       //     color: response?.Data[0].Colour,
  //       //     border: `2px solid ${response?.Data[0].Colour}`,
  //       //     cursor: 'pointer',
  //       //   };

  //       //   return data;
  //       // }

  //       // const data = {
  //       //   title: 'Code Challenge',
  //       //   date: '2022-05-31',
  //       //   color: '#D0EADB',
  //       //   border: '2px solid red',
  //       //   cursor: 'pointer',
  //       // };

  //       // return data;
  //     })
  //   );
  // }

  LoadCalenderEvents(UserId: string) {
    this.ngRedux.dispatch({ type: FETCH_CALENDAR_EVENT_LIST });
    let subscription = this._http
      .get<any>(`${this.GetCalendarEventsUrl}${UserId}`)
      .pipe(
        map((response: any) => {
          console.log('map: ', response);
          let Data = [];
          for (let i = 0; i < response.Data?.length; i++) {
            let data = {
              Id: response?.Data[i].EventId,
              title: response?.Data[i].Title,
              date: response?.Data[i].Date,
              color: response?.Data[i].Colour,
              border: `2px solid ${response?.Data[i].Colour}`,
              cursor: 'pointer',
              extra: {
                EventId: response?.Data[i].EventId,
                InterviewCandidateId: response?.Data[i].InterviewCandidateId,
                InterviewEmailBody: response?.Data[i].InterviewEmailBody,
                InterviewMeetLink: response?.Data[i].InterviewMeetLink,
                Title: response?.Data[i].Title,
                UpdatedByEmail: response?.Data[i].UpdatedByEmail,
                UpdatedDate: response?.Data[i].UpdatedDate,
                UserId: response?.Data[i].UserId,
                isInterview: response?.Data[i].isInterview,
              },
            };
            Data.push(data);
            // console.log('map Data: ', Data);
          }
          return Data;
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: FETCH_CALENDAR_EVENT_LIST_SUCCESS,
              payload: response,
            });
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_CALENDAR_EVENT_LIST_ERROR,
            payload: err,
          });
        },
      });
    this.subscriptions.push(subscription);
  }

  removeCalendarEvent(EventId: string) {
    return this._http.delete(`${this.RemoveCalendarEventUrl}${EventId}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
