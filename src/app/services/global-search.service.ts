import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_GLOBAL_SEARCH_RESULT,
  FETCH_GLOBAL_SEARCH_RESULT_ERROR,
  FETCH_GLOBAL_SEARCH_RESULT_SUCCESS,
} from 'src/STORE/_globalSearch.store/globalSearch.actions';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {
  SearchUrl = environment.baseUrl + 'api/Search/';
  GetGlobalSearchUrl = this.SearchUrl + 'global';
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  LoadGlobalSearch(Payload: GlobalSearchPayload) {
    this.ngRedux.dispatch({ type: FETCH_GLOBAL_SEARCH_RESULT });
    return this._http
      .get<any>(
        `${this.GetGlobalSearchUrl}/${Payload.SearchTerm}?pageSize=${Payload.PageSize}&pageNumber=${Payload.PageNumber}`
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.warn('response--------->: ', response);
            this.ngRedux.dispatch({
              type: FETCH_GLOBAL_SEARCH_RESULT_SUCCESS,
              payload: response?.Data,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.ngRedux.dispatch({
              type: FETCH_GLOBAL_SEARCH_RESULT_ERROR,
              payload: err,
            });
          }
        },
      });
    // l/alli?pageSize=20&pageNumber=1
  }
}

export interface GlobalSearchPayload {
  SearchTerm: string;
  PageSize: number;
  PageNumber: number;
}
// _globalSearch.store
