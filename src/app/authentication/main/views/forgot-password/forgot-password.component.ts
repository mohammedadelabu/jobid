import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  favoriteColorControl = new FormControl('iballi@gmail.com');
  model: any = {};
  isEmailEmpty = false;
  errorMsg: any;
  ResponseMessage: any;
  constructor(
    private _authSvc: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // console.log('EMAIL: ', this.model);
    // this._identitySvc.changeUserPassword(this.model.value).subscribe(response=>{
    //   
    // }, err=>{
    //   console.error(err);
    // })
    // if ((this.model.Email = '')) {
    //   this.isEmailEmpty = true;
    //   return;
    // } else {
    // }

    
    this._authSvc
      .forgotPassword_RequestVerification(this.model.Email)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this.ResponseMessage = response.ResponseMessage;
            setTimeout(() => {
              this.ResponseMessage = '';
            }, 2500);
            if (response.ResponseCode === 'ERR') {
              return;
            }

            if (response.ResponseMessage === 'Email not found!') {
              return;
            }
            setTimeout(() => {
              // this._router.navigate(['/authenticate-user/password-change-verification']);
              this._router.navigate([`/auth/verification/${this.model.Email}`]);
            }, 2000);
          }
        },
        error: (error) => {
          this.errorMsg = error;
          // console.warn('error: ', this.errorMsg);
          // this._router.navigate(['/password-change-verification']);
        },
      });
  }

}
