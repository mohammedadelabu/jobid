import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_COMPANY_CONTACT_LIST,
  FETCH_COMPANY_CONTACT_LIST_ERROR,
  FETCH_COMPANY_CONTACT_LIST_SUCCESS,
} from 'src/STORE/_companyContact.store/companyContact.actions';
import { FETCH_CONTACT_LIST, FETCH_CONTACT_LIST_ERROR, FETCH_CONTACT_LIST_SUCCESS } from 'src/STORE/_contact.store/contact.actions';
import {
  FETCH_DEAL_CONTACT_LIST,
  FETCH_DEAL_CONTACT_LIST_ERROR,
  FETCH_DEAL_CONTACT_LIST_SUCCESS,
} from 'src/STORE/_dealContact.store/dealContact.actions';
import { AddContact, AddIdentifiedContact } from '../models/types/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  ContactUrl = environment.baseUrl + 'api/Contact/';
  AddContactUrl = this.ContactUrl + 'AddContact/';
  AddNewDealContactUrl = this.ContactUrl + 'NewDealContact/';
  AddNewLeadContactUrl = this.ContactUrl + 'NewLeadContact/';
  AddNewCompanyContactUrl = this.ContactUrl + 'NewCompaniesContact/';
  GetContactUrl = this.ContactUrl + 'GetContact/';
  GetCompaniesContactUrl = this.ContactUrl + 'GetCompaniesContact/';
  GetDealsContactUrl = this.ContactUrl + 'GetDealsContact/';
  GetContactPagedUrl = this.ContactUrl + 'GetContactPaged/Companies';
  Subscriptions: Subscription[] = [];

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  AddContact(Payload: AddContact) {
    return this._http.post(this.AddContactUrl, Payload);
  }

  AddNewDealContact(Payload: AddIdentifiedContact) {
    return this._http.post(this.AddNewDealContactUrl, Payload);
  }

  AddNewLeadContact(Payload: AddIdentifiedContact) {
    return this._http.post(this.AddNewLeadContactUrl, Payload);
  }

  AddNewCompanyContact(Payload: AddIdentifiedContact) {
    return this._http.post(this.AddNewCompanyContactUrl, Payload);
  }

  GetContact() {
    return this._http.get(`${this.GetContactUrl}`);
  }

  GetCompaniesContact(CompanyId: string) {
    this.ngRedux.dispatch({ type: FETCH_COMPANY_CONTACT_LIST });
    return this._http
      .get(`${this.GetCompaniesContactUrl}${CompanyId}`)
      .subscribe({
        next: (response: any) => {
          console.log('response*!!!*: ', response);
          if (response) {
            this.ngRedux.dispatch({
              type: FETCH_COMPANY_CONTACT_LIST_SUCCESS,
              payload: response.Data,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            this.ngRedux.dispatch({
              type: FETCH_COMPANY_CONTACT_LIST_ERROR,
              payload: err,
            });
          }
        },
      });
  }

  GetDealsContact(DealId: string) {
    this.ngRedux.dispatch({ type: FETCH_DEAL_CONTACT_LIST });
    return this._http.get(`${this.GetDealsContactUrl}${DealId}`).subscribe({
      next: (response: any) => {
        console.log('response*!!!*: ', response);
        if (response) {
          this.ngRedux.dispatch({
            type: FETCH_DEAL_CONTACT_LIST_SUCCESS,
            payload: response?.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_DEAL_CONTACT_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
  }

  LoadContactPagedList(Payload: ContactPaged) {
    this.ngRedux.dispatch({
      type: FETCH_CONTACT_LIST,
    });
    if (Payload.StartDate != null && Payload.EndDate != null) {
      let subscription = this._http.get(
        `${this.GetContactPagedUrl}?StartDate=${encodeURIComponent(Payload?.StartDate)}&EndDate=${encodeURIComponent(Payload?.EndDate)}&PageSize=${Payload?.PageSize}&PageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (
      Payload.StartDate != null &&
      Payload.EndDate != null &&
      Payload.CompanyId != null
    ) {
      let subscription = this._http.get(
        `${this.GetContactPagedUrl}/${Payload?.CompanyId}?StartDate=${Payload?.StartDate}&EndDate=${Payload?.EndDate}&PageSize=${Payload?.PageSize}&PageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else if (Payload.CompanyId != null) {
      let subscription = this._http.get(
        `${this.GetContactPagedUrl}/${Payload?.CompanyId}?PageSize=${Payload?.PageSize}&PageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    } else {
      // alert("last!!")
      let subscription = this._http.get(
        `${this.GetContactPagedUrl}?PageSize=${Payload?.PageSize}&PageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadLeadPagedList(subscription);
    }
  }



  SubscribeLoadLeadPagedList(subscription: any) {
    subscription?.subscribe({
      next: (response: any) => {
        if (response) {
          this.ngRedux.dispatch({
            type: FETCH_CONTACT_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_CONTACT_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
    this.Subscriptions.push(subscription);
  }
}


export interface ContactPaged {
  StartDate: string | null;
  EndDate: string | null;
  CompanyId?: string | null;
  PageSize: number | null;
  PageNumber: number | null;
}