import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import { FETCH_LEAD_TAGS, FETCH_LEAD_TAGS_ERROR, FETCH_LEAD_TAGS_SUCCESS } from 'src/STORE/_leadTag.store/leadTag.actions';


@Injectable({
  providedIn: 'root',
})
export class LeadTagService {
  //
  GetAllLeadTagUrl = environment.baseUrl + 'api/Tag/get_all';
  GetLeadTagUrl = environment.baseUrl + 'api/Tag/get';
  AddLeadTagUrl = environment.baseUrl + 'api/Tag/Add';

  constructor(private _http: HttpClient, private ngRegux: NgRedux<IAppState>) {}

  LoadLeadTags() {
    this.ngRegux.dispatch({ type: FETCH_LEAD_TAGS });
    return this._http
      .get<any>(this.GetAllLeadTagUrl)
      .pipe(
        map((m: any) => {
          const Body = m;
          let DataArray = Body?.Data;
          let Data: Tag[] = [];

          if ((Body.ResponseCode = '00')) {
            for (let key in DataArray) {
              const LeadTag: any = {
                id: DataArray[key].Id,
                name: DataArray[key].Name,
                dateCreated: DataArray[key].DateCreated,
                dateModified: DataArray[key].DateModified,
                isChecked: false,
              };
              Data.push(LeadTag);
            }
          }

          return Data;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.ngRegux.dispatch({
            type: FETCH_LEAD_TAGS_SUCCESS,
            payload: response,
          });
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.ngRegux.dispatch({
              type: FETCH_LEAD_TAGS_ERROR,
              payload: err,
            });
          }
        },
      });
  }
  GetAllLeadTags(): Observable<any> {
    return this._http.get<any>(this.GetAllLeadTagUrl).pipe(
      map((m: any) => {
        const Body = m;
        let DataArray = Body?.Data;
        let Data: Tag[] = [];

        if ((Body.ResponseCode = '00')) {
          for (let key in DataArray) {
            const LeadTag: any = {
              id: DataArray[key].Id,
              name: DataArray[key].Name,
              dateCreated: DataArray[key].DateCreated,
              dateModified: DataArray[key].DateModified,
              isChecked: false,
            };
            Data.push({ ...LeadTag, key: key });
          }
        }

        return Data;
      })
    );
  }

  // DateCreated: "2022-08-23T13:44:12.1908534"
  // DateModified: null
  // Id: "cf524a9e-42c4-4d5e-7299-08da85052e29"
  // Name: "Email Sent"

  AddLeadTag(Tag: Tag) {
    return this._http.post(this.AddLeadTagUrl, Tag);
  }
}

export interface Tag {
  Name: 'string';
}
export interface GetTag {
  id: string;
  name: string;
  dateCreated: string;
  dateModified: string;
  isChecked: boolean;
  key: any;
}
