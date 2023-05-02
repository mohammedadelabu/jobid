import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_LEADS_LIST,
  FETCH_LEADS_LIST_ERROR,
  FETCH_LEADS_LIST_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';
import { Lead } from '../models/types/lead';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  // baseUrl = 'http://localhost:3000/Leads/';
  GetAllLeadUrl = environment.baseUrl + 'api/Lead/GetAllLead/';
  GetAllLeadForUserUrl = environment.baseUrl + 'api/Lead/GetAllLeadForUser/';
  GetLeadPagedUrl = environment.baseUrl + 'api/Lead/GetLeadPaged';
  GetLeadUrl = environment.baseUrl + 'api/Lead/GetLead';
  AddLeadUrl = environment.baseUrl + 'api/Lead/AddLead/';
  UpdateLeadUrl = environment.baseUrl + 'api/Lead/UpdateLead/';
  RemoveLeadUrl = environment.baseUrl + 'api/Lead/RemoveLead/';
  SendEmailUrl = environment.baseUrl + 'api/Lead/SendEmail/';
  leadImportUrl = environment.baseUrl + 'api/Lead/import/';
  bulkRemoveLeadUrl = environment.baseUrl + 'api/Lead/BulkRemoveLead/';

  LeadMessengerSubject = new Subject();
  Subscriptions: Subscription[] = [];

  // LeadTags:Tag[] = [
  //   {
  //     id: 1,
  //     name: 'New lead',
  //     isChecked: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Connected on linkedin',
  //     isChecked: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Email V2 sent',
  //     isChecked: false,
  //   },
  //   {
  //     id: 4,
  //     name: 'Email sent',
  //     isChecked: false,
  //   },
  // ];
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  LoadLeadsList() {
    // return this._http.get<any>(this.GetAllLeadUrl);
    this.ngRedux.dispatch({
      type: FETCH_LEADS_LIST,
    });
    let subscription = this._http.get<any>(this.GetAllLeadUrl).subscribe({
      next: (response) => {
        if (response) {
          this.ngRedux.dispatch({
            type: FETCH_LEADS_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_LEADS_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
    this.Subscriptions.push(subscription);
  }


  LoadLeadsListForUser(Payload: any) {
    this.ngRedux.dispatch({
      type: FETCH_LEADS_LIST,
    });
    if (Payload.StartDate != null && Payload.EndDate != null) {
      let subscription = this._http.get(
        `${this.GetAllLeadForUserUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (
      Payload.StartDate != null &&
      Payload.EndDate != null &&
      Payload.TagId != null
    ) {
      let subscription = this._http.get(
        `${this.GetAllLeadForUserUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (Payload.TagId != null) {
      let subscription = this._http.get(
        `${this.GetAllLeadForUserUrl}?tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else {
      let subscription = this._http.get(
        `${this.GetAllLeadForUserUrl}?pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    }
  }


  LoadLeadPagedList(Payload: LeadPaged) {
    this.ngRedux.dispatch({
      type: FETCH_LEADS_LIST,
    });
    if (Payload.StartDate != null && Payload.EndDate != null) {
      let subscription = this._http.get(
        `${this.GetLeadPagedUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (
      Payload.StartDate != null &&
      Payload.EndDate != null &&
      Payload.TagId != null
    ) {
      let subscription = this._http.get(
        `${this.GetLeadPagedUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (Payload.TagId != null) {
      let subscription = this._http.get(
        `${this.GetLeadPagedUrl}?tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else {
      let subscription = this._http.get(
        `${this.GetLeadPagedUrl}?pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    }
  }

  SubscribeLoadLeadPagedList(subscription: any) {
    subscription?.subscribe({
      next: (response: any) => {
        if (response) {
          // console.group("response: ", response)
          this.ngRedux.dispatch({
            type: FETCH_LEADS_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_LEADS_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  GetLeadDetails(LeadId: string) {
    return this._http.get(`${this.GetLeadUrl}/${LeadId}`);
  }

  AddLead(Payload: Lead) {
    return this._http.post(`${this.AddLeadUrl}`, Payload);
  }

  UpdateLead(Payload: Lead, Id: string) {
    return this._http.put(`${this.UpdateLeadUrl}${Id}`, Payload);
  }

  DeleteLead(Id: string) {
    return this._http.delete(`${this.RemoveLeadUrl}${Id}`);
  }

  BulkRemoveLead(Payload: string[]) {
    return this._http.post(`${this.bulkRemoveLeadUrl}`, Payload);
  }

  // GetLeadTags() {
  //   return this.LeadTags;
  // }

  // AddLeadTag(Tag: Tag) {
  //   this.LeadTags.unshift(Tag);
  // }

  sendLeadMessageSubject(Msg: any) {
    this.LeadMessengerSubject.next(Msg);
  }

  SendLeadEmailMessage(Payload: SendLeadMail) {
    return this._http.post(this.SendEmailUrl, Payload);
  }

  importLeadFile(Payload: any) {
    return this._http.post(this.leadImportUrl, Payload);
  }
}

export interface Tag {
  id: any;
  name: string;
  isChecked: boolean;
}

export interface SendLeadMail {
  Subject: string;
  Body: string;
  Destination: any[];
}

// export interface LeadPaged {
//   StartDate?: string | null;
//   EndDate?: string | null;
//   TagId?: string | null;
//   PageSize?: number | null;
//   PageNumber?: number | null;
// }

export interface LeadPaged {
  StartDate: string | null;
  EndDate: string | null;
  TagId: string | null;
  PageSize: number | null;
  PageNumber: number | null;
}
