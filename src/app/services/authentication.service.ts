import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_LOGGED_IN_USER,
  FETCH_LOGGED_IN_USER_ERROR,
  FETCH_LOGGED_IN_USER_SUCCESS,
} from 'src/STORE/_loggedInUser.store/loggedInUser.actions';
import { handleError } from '../helpers/errorHandler';
import {
  AuthenticateUser,
  CreateUserWithRole,
  UserModel,
} from '../models/types/user';
import { NotificationMessagesComponent } from '../shared/components/notification-messages/notification-messages.component';
import { NotificationMessagesService } from './notification-messages.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  CreateUserWithRoleUrl =
    environment.baseUrl + 'api/Identity/CreateUserWithRole/';
  AuthenticateUserUrl = environment.baseUrl + 'api/Identity/AuthenticateUser/';
  RefreshTokenUrl = environment.baseUrl + 'api/Identity/refresh-token/';
  GetUserByIdUrl = environment.baseUrl + 'api/Identity/GetUserById/';
  // UpdateUserUrl = environment.baseUrl + 'api/Identity/UpdateUser';
  ForgotPassword_RequestVerificationUrl =
    environment.baseUrl + 'api/Identity/ForgotPassword_RequestVerification/';
  VerifyForgotPasswordRequestUrl =
    environment.baseUrl + 'api/Identity/VerifyForgotPasswordRequest/';
  ResetPasswordUrl = environment.baseUrl + 'api/Identity/ResetPassword';
  EmailVerificationRequestUrl =
    environment.baseUrl + 'api/Identity/EmailVerificationRequest/';
  VerifyEmailVerificationRequestUrl =
    environment.baseUrl + 'api/Identity/VerifyEmailVerificationRequest/';
  PhoneNumberVerificationRequestUrl =
    environment.baseUrl + 'api/Identity/PhoneNumberVerificationRequest';

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private passwordVerificationCodeMsg: BehaviorSubject<any> =
    new BehaviorSubject('');
  constructor(
    private _http: HttpClient,
    private _notificationMessagesSvc: NotificationMessagesService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>
  ) { }

  registerUserWithRole(UserData: CreateUserWithRole): Observable<any> {
    return this._http.post<any>(this.CreateUserWithRoleUrl, UserData)
    // .pipe(
    //   tap((resp: any) => {
    //     console.log('from tap: ', resp);
    //     if (resp) {
    //       this._notificationMessagesSvc.addMessage(resp.ResponseMessage);
    //       this._snackBar.openFromComponent(NotificationMessagesComponent, {
    //         duration: this.durationInSeconds * 3000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //       });
    //       setTimeout(() => {
    //         this._notificationMessagesSvc.clear();
    //       }, 2000);
    //     }
    //   }),
    //   catchError(handleError)
    // );
  }

  loginUser(userData: AuthenticateUser): Observable<any> {
    return this._http.post<any>(this.AuthenticateUserUrl, userData).pipe(
      tap((res: any) => {
        // authentication and local storage code can go here
        // console.log('tap respone: ', res);
        if (res) {
          // console.log('User Data', res)
          this._router.navigate([`/recruiter/dashboard`]);
          // if (res.Role[0] === 'Administrator') {
          //   this._router.navigate([`/recruiter/dashboard`]);
          // } else {
          //   this._router.navigate([`/candidate`]);
          // }
        }
      }),
      map((response: any) => {
        console.log('Response in map', response)
        this.setUserData(response);
        this.setToken(response.AccessToken);
        this.RefreshToken(response.RefreshToken);
        localStorage.setItem('RefreshToken', response.RefreshToken);
        return response;
      }, catchError(handleError))
    );
  }

  isLogin() {
    // !!localStorage.getItem('token');
    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  RefreshToken(refreshtoken: any) {
    return this._http
      .post<UserModel>(this.RefreshTokenUrl, {
        refreshtoken,
      })
      .pipe(
        map((UserModel) => {
          console.log('NEW DATA UserModel: ', UserModel);
          localStorage.setItem('token', 'null');
          this.setToken(UserModel.AccessToken);
          localStorage.setItem('RefreshToken', UserModel.RefreshToken);
          return UserModel.AccessToken;
        })
      );
  }

  GenerateRefreshToken() {
    let input = {
      RefreshToken: this.getRefreshToken(),
    };
    return this._http.post(this.RefreshTokenUrl, input);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('RefreshToken') || '';
  }

  setUserData(userData: any) {
    JSON.stringify(userData);
    localStorage.setItem('currentUserData', JSON.stringify(userData));
  }

  getUserData() {
    let data: any = localStorage.getItem('currentUserData');
    return JSON.parse(data);
  }

  LoadUserData() {
    this.ngRedux.dispatch({ type: FETCH_LOGGED_IN_USER });
    let data: any = localStorage.getItem('currentUserData');
    if (data) {
      let x = JSON.parse(data);
      this.ngRedux.dispatch({ type: FETCH_LOGGED_IN_USER_SUCCESS, payload: x });
    } else {
      this.ngRedux.dispatch({
        type: FETCH_LOGGED_IN_USER_ERROR,
        payload: 'No User data found!. Kindly exist and login again',
      });
    }
  }

  getAUthUserDetails(Id: string) {
    return this._http.get(`${this.GetUserByIdUrl}${Id}`);
  }

  /* stuff */
  logoutUser() {
    // let refreshToken = this.getRefreshToken();
    // this._http.post(`${baseUrl}LogOut`, refreshToken);
    // this._http.post(
    //   'http://zartjobid-engine.azurewebsites.net/cv/api/Identity/LogOut',
    //   refreshToken
    // );
    localStorage.clear();
    this._router.navigate(['/auth']);
  }

  forgotPassword_RequestVerification(email: string): Observable<any> {
    // return this._http.post('http://zartjobid-engine.azurewebsites.net/cv/api/Identity/ForgotPassword_RequestVerification?email=test%40zwarttech.com', email);
    // return this._http.post('http://zartjobid-engine.azurewebsites.net/cv/api/Identity/ForgotPassword_RequestVerification', email);
    return (
      this._http
        .post(
          `${this.ForgotPassword_RequestVerificationUrl}?email=${email}`,
          email
        )
        // this._http
        //   // .post<any>(`${forgotPasswordRequestVerificationUrl}`, email)
        //   .post<any>(
        //     `http://zartjobid-engine.azurewebsites.net/cv/api/Identity/ForgotPassword_RequestVerification?email=${email}`,
        //     email
        //   )
        .pipe(catchError(handleError))
    );
  }

  PhoneVerificationRequest(Payload: VerifyPhone) {
    return this._http
      .post(
        `${this.PhoneNumberVerificationRequestUrl}?email=${Payload?.email}&phonumber=${Payload?.phonumber}`,
        Payload
      )
      .pipe(catchError(handleError));
  }

  EmailVerificationRequest(email: string): Observable<any> {
    console.log('EmailVerificationRequest: ', email);
    return this._http
      .post(`${this.EmailVerificationRequestUrl}?email=${email}`, email)
      .pipe(catchError(handleError));
  }
  VerifyEmailVerificationRequest(data: any, email: string) {
    return this._http
      .post(
        `${this.VerifyEmailVerificationRequestUrl}?email=${email}&verificationCode=${data.VerificationCode}`,
        data
      )
      .pipe(catchError(handleError));
  }

  setPasswordVerificationCodeMsg(msg: string) {
    return this.passwordVerificationCodeMsg.next(msg);
  }

  verifyCodeToChangePassword(data: any, email: string) {
    return this._http
      .post(
        `${this.VerifyForgotPasswordRequestUrl}?email=${email}&verificationCode=${data.VerificationCode}`,
        data
      )
      .pipe(catchError(handleError));
  }

  getPasswordVerificationCodeMsg() {
    return this.passwordVerificationCodeMsg.asObservable();
  }

  isVerifiedtrue!: boolean;
  isVerified() {
    let storageCode = localStorage.getItem('verificationCode');
    this.getPasswordVerificationCodeMsg().subscribe((response: any) => {
      // console.log('storageCode: ', storageCode);
      //
      if (storageCode != response) {
        this.isVerifiedtrue = false;
      } else {
        this.isVerifiedtrue = true;
      }
    });
    return this.isVerifiedtrue;
    // return !!localStorage.getItem('verificationCode');
  }

  changeUserPassword(newPassword: any, email: string) {
    return this._http
      .post(
        `${this.ResetPasswordUrl}?email=${encodeURIComponent(
          email
        )}&newPassword=${encodeURIComponent(newPassword)}`,
        newPassword
      )
      .pipe(catchError(handleError));
  }
  _changeUserPassword(Payload: any) {
    return this._http
      .post(
        `${this.ResetPasswordUrl}?email=${encodeURIComponent(
          Payload?.email
        )}&newPassword=${encodeURIComponent(Payload?.newPassword)}`,
        Payload
      )
      .pipe(catchError(handleError));
  }
}

export interface VerifyPhone {
  email: string;
  phonumber: string;
}
