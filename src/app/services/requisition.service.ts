import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_REQUISITION_LIST,
  FETCH_REQUISITION_LIST_ERROR,
  FETCH_REQUISITION_LIST_SUCCESS,
} from 'src/STORE/_requisition.store/requisition.actions';
import { QueryParamsModel } from '../models/types/queryParamsModel';
import { Requisition } from '../models/types/requisition';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  requisitionMessengerSubject = new Subject();
  baseUrl = 'http://localhost:3000/Requisitions/';

  GetAllRequisitionsUrl =
    environment.baseUrl + 'api/Requisition/GetRequisition/';
  GetRequisitionCategoriesUrl =
    environment.baseUrl + 'api/SkillCategory/GetRequisitionCategories';
  AddRequisitionUrl = environment.baseUrl + 'api/Requisition/AddRequisition/';
  UpdateRequisitionUrl =
    environment.baseUrl + 'api/Requisition/UpdateRequisition/';
  PatchRequisitionStatusUrl =
    environment.baseUrl + 'api/Requisition/PatchRequisition/';
  RemoveRequisitionUrl =
    environment.baseUrl + 'api/Requisition/RemoveRequisition/';

  requisitionStatusList: RequisitionStatus[] = [
    {
      name: 'Ongoing',
      value: 'ongoing',
    },
    {
      name: 'New',
      value: 'new',
    },
    {
      name: 'Rejected',
      value: 'rejected',
    },
    {
      name: 'Onhold',
      value: 'onhold',
    },
    {
      name: 'Closed',
      value: 'closed',
    },
    {
      name: 'Rollover',
      value: 'rollover',
    },
    {
      name: 'Completed',
      value: 'completed',
    },
    {
      name: 'Profile Submitted Awaiting feedback',
      value: 'awaiting feedback',
    },
  ];

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  SendRequisitionMessengerSubject(Msg: string) {
    this.requisitionMessengerSubject.next(Msg);
  }

  GetRequisitionStatusList() {
    return this.requisitionStatusList;
  }

  LoadRequisition(queryParams: string) {
    // return this._http.get<any>(this.baseUrl);
    this.ngRedux.dispatch({
      type: FETCH_REQUISITION_LIST,
    });

    this._http
      .get<any>(`${this.GetAllRequisitionsUrl}${queryParams}`)
      .subscribe({
        next: (response: any) => {
          // if (response.ResponseCode == '00') {
          // }
          if (response) {
            let requisitions = response?.Data;
            this.ngRedux.dispatch({
              type: FETCH_REQUISITION_LIST_SUCCESS,
              requisitionsList: requisitions,
            });
          }
        },

        // this._http.get<any>(this.baseUrl).subscribe({
        // next: (requisitions: any) => {
        //   console.log('requisitions: ', requisitions);
        //   if (requisitions) {
        //     this.ngRedux.dispatch({
        //       type: FETCH_REQUISITION_LIST_SUCCESS,
        //       requisitionsList: requisitions,
        //     });
        //   }
        // },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_REQUISITION_LIST_ERROR,
            errors: err,
          });
        },
      });

    // this._http.get<any>(this.GetAllRequisitionsUrl).subscribe({
    //   next: (requisitions: any) => {
    //     console.log('requisitions: ', requisitions);
    //     if (requisitions) {
    //       this.ngRedux.dispatch({
    //         type: FETCH_REQUISITION_LIST_SUCCESS,
    //         requisitionsList: requisitions,
    //       });
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //     this.ngRedux.dispatch({
    //       type: FETCH_REQUISITION_LIST_ERROR,
    //       errors: err,
    //     });
    //   },
    // });
  }

  // AddRequisition(Requisition: Requisition) {
  //   return this._http.post(`${this.baseUrl}`, Requisition);
  // }

  // UpdateRequisition(Requisition: Requisition) {
  //   return this._http.put(`${this.baseUrl}${Requisition.Id}`, Requisition);
  // }

  AddRequisition(Requisition: Requisition, UserId: string) {
    return this._http.post(`${this.AddRequisitionUrl}${UserId}`, Requisition);
  }

  UpdateRequisition(Requisition: any) {
    return this._http.put(
      `${this.UpdateRequisitionUrl}${Requisition.Id}`,
      Requisition
    );
  }

  PatchRequisitionStatus(Payload: any) {
    return this._http.patch(
      `${this.PatchRequisitionStatusUrl}${Payload.Id}/status/${Payload.Status}`,
      {
        id: Payload.Id,
        status: Payload.Status,
      }
    );
  }

  RemoveRequisition(Id: any) {
    return this._http.delete(`${this.RemoveRequisitionUrl}${Id}`);
  }
}

export interface RequisitionStatus {
  name: string;
  value: string;
}
