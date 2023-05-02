import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_BRANCH_LOCATION_LIST,
  FETCH_BRANCH_LOCATION_LIST_ERROR,
  FETCH_BRANCH_LOCATION_LIST_SUCCESS,
  FETCH_HQ_LOCATION_LIST_SUCCESS,
} from 'src/STORE/_branchLocation.store/branchLocation.actions';

@Injectable({
  providedIn: 'root',
})
export class BranchLocationService {
  localUrl = ' http://localhost:3000/BranchList';
  BaseUrl = environment.baseUrl;
  // GetAllBranchesUrl = this.BaseUrl + 'GetAllBranches';
  CreateBranchUrl = this.BaseUrl + 'CreateBranch';
  UpdateBranchUrl = this.BaseUrl + 'UpdateBranch';
  // RemoveBranchUrl = this.BaseUrl + 'RemoveBranch';

  //

  BranchLocationUrl = environment.baseUrl;
  GetAllBranchesUrl = this.BranchLocationUrl + 'GetAllBranches/';
  GetCompanyByIdUrl = this.BranchLocationUrl + 'GetBranchbyId';
  RemoveBranchUrl = this.BranchLocationUrl + 'RemoveBranch';
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  CreateBranchLocation(Payload: BranchLocation, queryParams: string) {
    console.log('queryParams: ', queryParams);
    // return this._http.post(this.localUrl, Payload);
    // http://zartechjobid-env.eba-ch2i6vxr.eu-west-2.elasticbeanstalk.com/CreateBranch?Street=No%2010b&City=Abule-egba&Country=Aruba&PostCode=3044990&Name=Zarttech&branchType=Branch
    return this._http.post(`${this.CreateBranchUrl}${queryParams}`, Payload);
  }

  LoadBranchLocationList() {
    this.ngRedux.dispatch({ type: FETCH_BRANCH_LOCATION_LIST });
    return this._http.get(this.GetAllBranchesUrl).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          let hqLocationList = response?.Data.filter(
            (location: any) => location?.branchType == 1
          );
          let branchLocationList = response?.Data.filter(
            (location: any) => location?.branchType == 2
          );
          // FETCH_HQ_LOCATION_LIST
          this.ngRedux.dispatch({
            type: FETCH_BRANCH_LOCATION_LIST_SUCCESS,
            payload: branchLocationList,
          });
          this.ngRedux.dispatch({
            type: FETCH_HQ_LOCATION_LIST_SUCCESS,
            payload: hqLocationList,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          console.log('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_BRANCH_LOCATION_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
  }
  GetBranchLocationById(Id: string) {
    return this._http.get(`${this.GetCompanyByIdUrl}/${Id}`);
  }

  UpdateBranchLocation(Id: string, Payload: BranchLocation) {}
  RemoveBranchLocation(Id: string) {
    return this._http.delete(`${this.RemoveBranchUrl}/${Id}`);
  }
}

export interface BranchLocation {
  BranchName: string;
  BranchType: string;
  Street: string;
  City: string;
  Country: string;
  PostalCode: string;
  // CreatedBy: string;
  // id: string;
}

export enum BranchType {
  HQ = 'HQ',
  BRANCH_OFFICE = 'Branch Office',
}
