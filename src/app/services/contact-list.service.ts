import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_ERROR,
  FETCH_CONTACT_LIST_SUCCESS,
} from 'src/STORE/_contact.store/contact.actions';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  ContactUrl = environment.baseUrl + 'api/Contact/';
  // GetContactUrl = this.ContactUrl + 'GetContact'; //No longer in use
  GetContactUrl = this.ContactUrl + 'GetContactPaged/Companies';
  RemoveContactUrl = this.ContactUrl + 'RemoveContact';
  RemoveBulkContactUrl = this.ContactUrl + 'BulkRemoveContact';
  // UpdateContactUrl = this.ContactUrl + 'update_contact';

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  GetContactList() {
    return this._http.get(this.GetContactUrl);
  }
  LoadContactList() {
    this.ngRedux.dispatch({ type: FETCH_CONTACT_LIST });
    return this._http.get(this.GetContactUrl).subscribe({
      next: (response: any) => {
        console.log('incoming: ', response)
        if (response.ResponseCode == '00' || response.ResponseCode == '404') {
          this.ngRedux.dispatch({
            type: FETCH_CONTACT_LIST_SUCCESS,
            payload: response?.Data,
          });
        }
      },
      error: (err) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_CONTACT_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
  }

  RemoveContact(ContactId: string): Observable<any> {
    return this._http.delete<any>(`${this.RemoveContactUrl}/${ContactId}`);
  }

  RemoveBulkContact(Payload: string[]) {
    return this._http.post(this.RemoveBulkContactUrl, Payload);
  }
}
