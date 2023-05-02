import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_LOGIN_AUTH,
  FETCH_LOGIN_AUTH_ERROR,
  FETCH_LOGIN_AUTH_SUCCESS,
} from 'src/STORE/_loginAuth.store/loginAuth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @select((s) => s.loginAuth.loginAuth) loginAuth$: any;
  @select((s) => s.loginAuth.isLoading) isLoading$: any;
  loginUserForm!: FormGroup;
  formBtnLabel = "SIGN IN";
  errorMsg: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authSvc: AuthenticationService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginUserForm = this._fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      RememberMe: [false, [Validators.required]],
    });
  }

  handleLoginUser() {
    this.ngRedux.dispatch({ type: FETCH_LOGIN_AUTH });
    // this.store.dispatch(new Login(this.loginUserForm.value));
    let subscription = this._authSvc
      .loginUser(this.loginUserForm.value)
      .subscribe({
        next: (response: any) => {
          if (response) {
            // console.log('auth-user | login-user: ', response);
            // console.log(response.Role[0]);
            this.ngRedux.dispatch({
              type: FETCH_LOGIN_AUTH_SUCCESS,
              payload: response,
            });
            this._authSvc.LoadUserData();
            this._router.navigate([`/recruiter/dashboard`]);
            // if (response.Role[0] === 'Administrator') {
            //   this._router.navigate([`/recruiter/dashboard`]);
            // } else {
            //   this._router.navigate([
            //     `/candidate/account/profile/${response?.Id}/${response?.Email}`,
            //   ]);
            // }
          }
        },
        error: (error: any) => {
          if (error) {
            console.error('Login error!: ', error);
            // this.ngRedux.dispatch({
            //   type: FETCH_LOGIN_AUTH_ERROR,
            //   payload: error,
            // });
            console.warn(error);
            console.error(error.error);
            this.errorMsg = error.error;
            if (error.status == 404 || error.status == 400) {
              this.errorMsg = 'Incorrect email address and/or password!';
              this.ngRedux.dispatch({
                type: FETCH_LOGIN_AUTH_ERROR,
                payload: this.errorMsg,
              });
            }
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
