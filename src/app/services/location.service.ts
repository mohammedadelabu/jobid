import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_LOCATION_LIST,
  FETCH_LOCATION_LIST_ERROR,
  FETCH_LOCATION_LIST_SUCCESS,
} from 'src/STORE/_location.store/location.actions';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  LocationUrl = environment.baseUrl + 'api/Location';
  GetLocationUrl = this.LocationUrl + '/GetLocations';

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  LoadLocations() {
    this.ngRedux.dispatch({ type: FETCH_LOCATION_LIST });
    this._http
      .get<any>(this.GetLocationUrl)
      .pipe(
        map((m: any) => {
          let list: any[] = [];
          let arr = m.Data;
          for (let i in arr) {
            const location = {
              Name: arr[i].LocatioName,
              Id: arr[i].Id,
            };

            list.push(location);
          }
          return list;
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            this.ngRedux.dispatch({
              type: FETCH_LOCATION_LIST_SUCCESS,
              payload: response,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            
            this.ngRedux.dispatch({
              type: FETCH_LOCATION_LIST_ERROR,
              payload: err,
            });
          }
        },
      });
  }
}
