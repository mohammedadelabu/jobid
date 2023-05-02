import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { catchError, map, Observable, retry, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_COMPANY_DETAILS,
  FETCH_COMPANY_DETAILS_ERROR,
  FETCH_COMPANY_DETAILS_SUCCESS,
  FETCH_COMPANY_LIST,
  FETCH_COMPANY_LIST_ERROR,
  FETCH_COMPANY_LIST_FORUSER,
  FETCH_COMPANY_LIST_FORUSER_ERROR,
  FETCH_COMPANY_LIST_FORUSER_SUCCESS,
  FETCH_COMPANY_LIST_SUCCESS,
} from 'src/STORE/_company.store/company.actions';
import { handleError } from '../helpers/errorHandler';
import { Company, CompanyResponse } from '../models/types/company';
import { NotificationMessagesComponent } from '../shared/components/notification-messages/notification-messages.component';
import { NotificationMessagesService } from './notification-messages.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService implements OnDestroy {
  CompanyUrl = environment.baseUrl;
  GetAllCompaniesUrl = this.CompanyUrl + 'GetAllCompanies/';
  GetAllCompaniesForUserUrl = this.CompanyUrl + 'GetAllCompaniesForUser/';
  GetCompanyById = this.CompanyUrl + 'GetCompanyById/';
  AddCompanyUrl = this.CompanyUrl + 'AddCompany/';
  UpdateCompanyUrl = this.CompanyUrl + 'UpdateCompany/';
  RemoveCompanyUrl = this.CompanyUrl + 'RemoveCompany/';
  GetCompanyContactsUrl = this.CompanyUrl + 'GetContactForCompany/';
  VerifyEmailUrl = this.CompanyUrl + 'VerifyEmail/';
  VerifyPhoneUrl = this.CompanyUrl + 'VerifyPhone/';
  BulkRemoveCompanyUrl =  this.CompanyUrl + 'BulkRemoveCompany/';
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subscriptions: Subscription[] = [];

  constructor(
    private _http: HttpClient,
    private _notificationMessagesSvc: NotificationMessagesService,
    private _snackBar: MatSnackBar,
    private ngRedux: NgRedux<IAppState>
  ) {}

  getCompanyList() {
    return this._http
      .get(this.GetAllCompaniesUrl, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        retry(5),
        map((response: any) => {
          const Body = response.body;
          console.log('Body', Body);
          let companies: CompanyResponse[] = Body.Data;
          let CompanyList: Company[] = [];

          if (response.status === 200) {
            if (Body.ResponseCode == '00') {
              for (let key in companies) {
                let company: CompanyResponse = {
                  Name: companies[key].Name,
                  CompanyId: companies[key].CompanyId,
                  ContactDetails: companies[key].ContactDetails,
                  Address: companies[key].Address,
                  Description: companies[key].Description,
                  Location: companies[key].Location,
                  Size: companies[key].Size,
                  Website: companies[key].Website,
                  VATReistration: companies[key].VATReistration,
                  EmailAddress: companies[key].EmailAddress,
                  LogoUrl: companies[key].LogoUrl,
                  UpdatedBy: companies[key].UpdatedBy,
                  ContactPerson1_FirstName:
                    companies[key].ContactPerson1_FirstName,
                  ContactPerson1_LastName:
                    companies[key].ContactPerson1_LastName,
                  ContactPerson1_Email: companies[key].ContactPerson1_Email,
                  ContactPerson1_Mobile: companies[key].ContactPerson1_Mobile,
                  ContactPerson1_Role: companies[key].ContactPerson1_Role,
                  ContactPerson2_FirstName:
                    companies[key].ContactPerson2_FirstName,
                  ContactPerson2_LastName:
                    companies[key].ContactPerson2_LastName,
                  ContactPerson2_Email: companies[key].ContactPerson2_Email,
                  ContactPerson2_Mobile: companies[key].ContactPerson2_Mobile,
                  ContactPerson2_Role: companies[key].ContactPerson2_Role,
                  //
                  InviteCompany: companies[key].InviteCompany,

                  //
                  // Address: companies[key].Address,
                  // CompanyId: companies[key].CompanyId,
                  // ContactDetails: companies[key].ContactDetails,
                  // ContactPersonEmail: companies[key].ContactPersonEmail,
                  // ContactPersonName: companies[key].ContactPersonName,
                  // ContactPersonPhone: companies[key].ContactPersonPhone,
                  // ContactPersonRole: companies[key].ContactPersonRole,
                  // Description: companies[key].Description,
                  // EmailAddress: companies[key].EmailAddress,
                  // LastUpdate: companies[key].LastUpdate,
                  // Location: companies[key].Location,
                  // LogoUrl: companies[key].LogoUrl,
                  // Name: companies[key].Name,
                  // Size: companies[key].Size,
                  // UpdatedBy: companies[key].UpdatedBy,
                  // VATReistration: companies[key].VATReistration,
                  // Website: companies[key].Website,
                };
                CompanyList.push({ ...company, key: key });
              }
            }
          }
          return {
            Data: CompanyList,
            Message: Body.ResponseMessage,
          };
        })
      );
  }

  LoadCompanyList() {
    this.ngRedux.dispatch({ type: FETCH_COMPANY_LIST });
    //
    let subscription = this._http
      .get(this.GetAllCompaniesUrl, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        retry(5),
        map((response: any) => {
          console.log('raw data**: ', response);
          const Body = response.body;
          let companies: any[] = Body?.Data;
          return companies;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('response data**: ', response);
          this.ngRedux.dispatch({
            type: FETCH_COMPANY_LIST_SUCCESS,
            payload: response,
          });
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_COMPANY_LIST_ERROR,
            payload: err,
          });
        },
      });
    this.subscriptions.push(subscription);
  }

  LoadCompaniesForUser(queryParams: string) {
    this.ngRedux.dispatch({ type: FETCH_COMPANY_LIST_FORUSER });
    //
    let subscription = this._http
      .get(`${this.GetAllCompaniesForUserUrl}${queryParams}`, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        retry(5),
        map((response: any) => {
          console.log('raw data**: ', response);
          const Body = response.body;
          let companies: any[] = Body?.Data;
          // let CompanyList: Company[] = [];

          return companies;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('response data**: ', response);
          this.ngRedux.dispatch({
            type: FETCH_COMPANY_LIST_FORUSER_SUCCESS,
            payload: response,
          });
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_COMPANY_LIST_FORUSER_ERROR,
            payload: err,
          });
        },
      });
    this.subscriptions.push(subscription);
  }

  getCompanyDetails(companyId: string): Observable<any> {
    return this._http.get<any>(`${this.GetCompanyById}?id=${companyId}`);
  }

  LoadCompanyDetails(companyId: string) {
    this.ngRedux.dispatch({ type: FETCH_COMPANY_DETAILS });
    return this._http
      .get<any>(`${this.GetCompanyById}?id=${companyId}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            switch (response.ResponseCode) {
              case '00':
                this.ngRedux.dispatch({
                  type: FETCH_COMPANY_DETAILS_SUCCESS,
                  payload: response?.Data,
                });
                break;
              case '404':
                this.ngRedux.dispatch({
                  type: FETCH_COMPANY_DETAILS_ERROR,
                  payload: response?.ResponseMessage,
                });
                break;

              default:
                break;
            }
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.ngRedux.dispatch({
              type: FETCH_COMPANY_DETAILS_ERROR,
              payload: err,
            });
          }
        },
      });
  }

  addCompany(Company: any) {
    return this._http.post(`${this.AddCompanyUrl}`, Company);
  }

  updateCompany(Company: any, CompanyId: string) {
    return this._http.put(`${this.UpdateCompanyUrl}${CompanyId}`, Company).pipe(
      tap((resp: any) => {
        console.log('from tap: ', resp);
        // if (resp) {
        //   this._notificationMessagesSvc.addMessage(resp.ResponseMessage);
        //   this._snackBar.openFromComponent(NotificationMessagesComponent, {
        //     duration: this.durationInSeconds * 1000,
        //     horizontalPosition: this.horizontalPosition,
        //     verticalPosition: this.verticalPosition,
        //   });
        //   setTimeout(() => {
        //     this._notificationMessagesSvc.clear();
        //   }, 2000);
        // }
      }),
      catchError(handleError)
    );
  }

  deleteCompany(companyId: string) {
    return this._http.delete(`${this.RemoveCompanyUrl}${companyId}`);
  }
  
  bulkRemoveCompany(Payload: string[]) {
    return this._http.post(`${this.BulkRemoveCompanyUrl}`, Payload);
  }

  getCompanyContacts(CompanyId: any) {
    return this._http.get(`${this.GetCompanyContactsUrl}${CompanyId}`);
  }

  // /GetContactForCompany/{companyId}

  verifyEmail(email: string) {
    return this._http.get<{
      Data: boolean;
      ResponseMessage: string;
      ResponseCode: string;
    }>(`${this.VerifyEmailUrl}${email}`);
  }

  verifyPhone(phone: string) {
    return this._http.get<{
      Data: boolean;
      ResponseMessage: string;
      ResponseCode: string;
    }>(`${this.VerifyPhoneUrl}${phone}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
