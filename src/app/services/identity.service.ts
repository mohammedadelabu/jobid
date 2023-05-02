import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_CANDIDATE_LIST,
  FETCH_CANDIDATE_LIST_ERROR,
  FETCH_CANDIDATE_LIST_SUCCESS,
} from 'src/STORE/_candidate.store/candidate.actions';
import {
  FETCH_LOGGED_IN_USER_INFORMATION,
  FETCH_LOGGED_IN_USER_INFORMATION_ERROR,
  FETCH_LOGGED_IN_USER_INFORMATION_SUCCESS,
} from 'src/STORE/_loggedInUserInformation.store/loggedInUserInformation.action';
import {
  FETCH_USER_BY_ID_EMAIL,
  FETCH_USER_BY_ID_EMAIL_ERROR,
  FETCH_USER_BY_ID_EMAIL_SUCCESS,
} from 'src/STORE/_userByIdEmail.store copy/userByIdEmail.actions';
import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_ERROR,
  FETCH_USER_LIST_SUCCESS,
} from 'src/STORE/_users.store/users.actions';
import { Candidate } from '../models/types/candidate';
import { User } from '../models/types/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  GetAllUsersUrl = environment.baseUrl + 'api/Identity/GetAllUsers';
  GetAllRecruitersUrl = environment.baseUrl + 'api/Identity/GetAllRecruiters';
  GetUserByIdUrl = environment.baseUrl + 'api/Identity/GetUserById/';
  GetUserByEmailUrl = environment.baseUrl + 'api/Identity/GetEmail/';
  UpdateUserUrl = environment.baseUrl + 'api/Identity/UpdateUser';
  AddUserToCompanyUrl = environment.baseUrl + 'api/Identity/AddUserToCompany';
  UpdateStatusAndCommentUrl =
    environment.baseUrl + 'api/Identity/UpdateStatusAndComment';
  UpdateEmptyReferenceNumbersUrl =
    environment.baseUrl + 'api/Identity/UpdateEmtyRefs';
  GetUsersUrl = environment.baseUrl + 'api/Identity/GetUsers';
  LockUserIpAddressUrl = environment.baseUrl + 'api/Identity/LockUserIpAddress';

  testApiUrl = 'http://localhost:3000/';
  fakeCandidatesUrl = 'http://localhost:3000/candidates';
  Data!: Candidate[];
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authenticationSvc: AuthenticationService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  LoadUsers(pageSize: number, pageNumber: number, searchWord: string) {
    // ?SearchWord=alli
    this.ngRedux.dispatch({ type: FETCH_USER_LIST });
    if (searchWord) {
      let subscription = this._http.get(
        `${this.GetUsersUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}&searchWord=${searchWord}`,
        {
          observe: 'response',
          // observe: 'events',
        }
      );
      this.SubscribeLoadUsersWithIpLockPagedList(subscription);
    } else {
      let subscription = this._http.get(
        `${this.GetUsersUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          observe: 'response',
          // observe: 'events',
        }
      );
      this.SubscribeLoadUsersWithIpLockPagedList(subscription);
    }
  }

  SubscribeLoadUsersWithIpLockPagedList(Subscription: any) {
    Subscription.pipe(
      retry(5),
      map((response: any) => {
        const Body = response.body;
        let users: any[] = Body.Data?.Items;

        let UsersList: any[] = [];
        if (response.status === 200) {
          if (Body.ResponseCode == '00') {
            for (let key in users) {
              let user: any = {
                Id: users[key].Id,
                FirstName: users[key].FirstName,
                LastName: users[key].LastName,
                RoleName: users[key].RoleName,
                RegionName: users[key].RegionName,
                IpAddress: users[key].IpAddress,
                IsIpLock: users[key].IsIpLock,
              };
              UsersList.push({ ...user, key: key });
            }
          }
        }
        return {
          // Data: UsersList,
          // Message: Body.ResponseMessage,
          Items: UsersList,
          page: Body.Data?.PageNumber,
          ItemsPerPage: Body.Data?.PageSize,
          totalRecords: Body.Data?.TotalSize,
        };
      })
    ).subscribe({
      next: (response: any) => {
        this.ngRedux.dispatch({
          type: FETCH_USER_LIST_SUCCESS,
          payload: response,
        });
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.ngRedux.dispatch({
          type: FETCH_USER_LIST_ERROR,
          payload: err,
        });
      },
    });
  }


  _LoadAllUsers(pageSize: number, pageNumber: number) {
    this.ngRedux.dispatch({ type: FETCH_CANDIDATE_LIST });
    return this._http
      .get(
        `${this.GetAllUsersUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          observe: 'response',
          // observe: 'events',
        }
      )
      .pipe(
        retry(5),
        map((response: any) => {
          const Body = response.body;
          let users: any[] = Body.Data?.Items;
          let UsersList: any[] = [];
          if (response.status === 200) {
            if (Body.ResponseCode == '00') {
              for (let key in users) {
                // console.log('444: ', users[key]);
                let user: Candidate = {
                  Id: users[key].Id,
                  FirstName: users[key].FirstName,
                  MiddleName: users[key].MiddleName,
                  LastName: users[key].LastName,
                  UserName: users[key].UserName,
                  Email: users[key].Email,
                  Created_At: users[key].Created_At,
                  ConcurrencyStamp: users[key].ConcurrencyStamp,
                  PhoneNumber: users[key].PhoneNumber,
                  PhoneNumberConfirmed: users[key].PhoneNumberConfirmed,
                  ProfileImageUrl: users[key].ProfileImageUrl,
                  Status: users[key].Status,
                  StatusComment: users[key].StatusComment,
                  InvitedBy: users[key].InvitedBy,
                  Modified_At: users[key].Modified_At,
                  CV_URL: users[key].CV_URL,
                  OldReference: users[key].OldReference,
                  NewReference: users[key].NewReference,
                  SendMail: users[key].SendMail,
                  UpdatedBy: users[key].UpdatedBy,
                };
                UsersList.push({ ...user, key: key });
                // console.log('UsersList: ', UsersList);
              }
            }
            // }
          }
          return {
            // Data: UsersList,
            // Message: Body.ResponseMessage,         
            Items: UsersList,
            page: Body.Data?.PageNumber,
            ItemsPerPage: Body.Data?.PageSize,
            totalRecords: Body.Data?.TotalSize,
          };
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          this.ngRedux.dispatch({
            type: FETCH_CANDIDATE_LIST_SUCCESS,
            payload: response,
          });
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_CANDIDATE_LIST_ERROR,
            payload: err,
          });
        },
      });
  }

  LoadAllUsers() {
    this.ngRedux.dispatch({ type: FETCH_CANDIDATE_LIST });
    return this._http
      .get(this.GetAllUsersUrl, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        retry(5),
        map((response: any) => {
          const Body = response.body;
          // if(use)
          // console.log('users: ', Body.Data);
          let users: any[] = Body.Data;
          let UsersList: Candidate[] = [];
          if (response.status === 200) {
            if (Body.ResponseCode == '00') {
              for (let key in users) {
                // console.log('444: ', users[key]);
                let user: Candidate = {
                  Id: users[key]?.id,
                  FirstName: users[key]?.firstName,
                  MiddleName: users[key].middleName,
                  LastName: users[key].lastName,
                  UserName: users[key].userName,
                  Email: users[key].email,
                  Created_At: users[key].created_At,
                  ConcurrencyStamp: users[key].concurrencyStamp,
                  PhoneNumber: users[key].phoneNumber,
                  PhoneNumberConfirmed: users[key].phoneNumberConfirmed,
                  ProfileImageUrl: users[key].profileImageUrl,
                  Status: users[key].status,
                  StatusComment: users[key].statusComment,
                  InvitedBy: users[key].invitedBy,
                  Modified_At: users[key].modified_At,
                  CV_URL: users[key].cV_URL,
                  OldReference: users[key].oldReference,
                  NewReference: users[key].newReference,
                  SendMail: users[key].sendMail,
                  UpdatedBy: users[key].updatedBy,
                };
                UsersList.push({ ...user, key: key });
                // console.log('UsersList: ', UsersList);
              }
            }
          }
          return {
            Data: UsersList,
            Message: Body.ResponseMessage,
          };
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          this.ngRedux.dispatch({
            type: FETCH_CANDIDATE_LIST_SUCCESS,
            payload: response?.Data,
          });
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_CANDIDATE_LIST_ERROR,
            payload: err,
          });
        },
      });
  }

  LoadAllRecruiters() {
    return this._http
      .get(this.GetAllRecruitersUrl, {
        observe: 'response',
        // observe: 'events',
      }).pipe(map((data: any) => {
        return data.body
      }))
  }

  getFakeUsers() {
    return this._http.get(this.fakeCandidatesUrl);
  }

  getLoggedInUserData() {
    let data: any = localStorage.getItem('currentUserData');
    if (!data) {
      this._router.navigate(['/auth']);
    }
    let userData = JSON.parse(data);
    return userData;
  }

  getUserById(userId: string): Observable<any> {
    return this._http
      .get(`${this.GetUserByIdUrl}${userId}`)
      .pipe(map((user: any) => user));
    // .pipe(catchError(handleError));
  }

  LoadUserById(userId: string) {
    this.ngRedux.dispatch({ type: FETCH_USER_BY_ID_EMAIL });
    this.ngRedux.dispatch({ type: FETCH_LOGGED_IN_USER_INFORMATION });
    return this._http
      .get(`${this.GetUserByIdUrl}${userId}`)
      .pipe(map((user: any) => user))
      .subscribe({
        next: (resp: any) => {
          if (resp) {
            this.ngRedux.dispatch({
              type: FETCH_USER_BY_ID_EMAIL_SUCCESS,
              payload: resp,
            });
            this.ngRedux.dispatch({
              type: FETCH_LOGGED_IN_USER_INFORMATION_SUCCESS,
              payload: resp,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.ngRedux.dispatch({
              type: FETCH_USER_BY_ID_EMAIL_ERROR,
              payload: err,
            });
            this.ngRedux.dispatch({
              type: FETCH_LOGGED_IN_USER_INFORMATION_ERROR,
              payload: err,
            });
          }
        },
      });
  }

  getUserByEmail(userEmail: string): Observable<any> {
    return this._http
      .post(`${this.GetUserByEmailUrl}`, {
        Email: userEmail,
      })
      .pipe(map((user: any) => user));
    // .pipe(catchError(handleError));
  }

  updatePersonalInfo(info: any, email: string) {
    return this._http.put(`${this.UpdateUserUrl}?Email=${encodeURIComponent(email)}`, info);
  }

  addUserToCompany(Payload: any) {
    return this._http.post(
      `${this.AddUserToCompanyUrl}?email=${encodeURIComponent(Payload.Email)}&role=${Payload.Role}&CompanyID=${Payload.CompanyId}`,
      {
        email: Payload.Email,
        role: Payload.Role,
        CompanyID: Payload.CompanyId,
      }
    );
  }
  // https://zartjobid-engine.azurewebsites.net/cv/api/Identity/AddUserToCompany?email=ibrahimalli2016%40yahoo.com&role=Marketer&CompanyID=aba66618-15b2-41eb-686f-08da34ca7ad7
  updateStatusAndComment(Payload: any) {
    return this._http.patch(
      `${this.UpdateStatusAndCommentUrl}?email=${encodeURIComponent(Payload.email)}&status=${Payload.status}&statusComment=${Payload.statusComment}`,
      Payload
    );
    // UpdateStatusAndComment?email=ibrahimalli2016%40yahoo.com&status=Code%20challenge
  }

  /* LOGGEDIN USER && UPDATED BY */
  loggedInUser = this.getLoggedInUserData().Email;
  loggedInUserId = this.getLoggedInUserData().Id;
  UpdatedBy: any = '';
  updatedBy() {
    return this.loggedInUser;
    // console.log('this.loggedInUser: ', this.loggedInUser);
    // this._authenticationSvc.getAUthUserDetails(this.loggedInUser).subscribe({
    //   next: (response: any) => {
    //     console.log('Logged in person', response);
    //     this.UpdatedBy = `${response.FirstName} ${response.LastName}`;
    //     console.log('this.UpdatedBy', this.UpdatedBy);
    //     // return this.UpdatedBy;
    //   },
    //   error: (err: any) => {
    //     
    //   },
    // });
    // console.log("data: ", this.UpdatedBy);
    // return this.UpdatedBy;
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }

  UpdateEmptyReferenceNumbers() {
    return this._http.patch(this.UpdateEmptyReferenceNumbersUrl, null);
  }

  ToggleUserIpLock(UserId: string, Payload: IsIpLock) {
    return this._http.patch(`${this.LockUserIpAddressUrl}/${UserId}`, Payload);
  }
}

export interface IsIpLock {
  isLock: boolean;
}
