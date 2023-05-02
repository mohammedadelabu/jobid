import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  @select((s) => s.userByIdEmail.userByIdEmail) userByIdEmail$: any;
  @select((s) => s.userByIdEmail.isLoading) isUserByIdEmailLoading$: any;
  isUpdatePersonalInfo: boolean = false;
  isAddSecondaryEmailAddress: any;
  isResetPassword: boolean = false;
  isVerifyEmailCode: boolean = false;
  isSetNewPassword: boolean = false;
  userDetails: any;
  ResponseMessage: any;
  errorMsg: any;
  isSubmittingForm!: boolean;
  constructor(private _authSvc: AuthenticationService, private _toastrSvc: ToastrService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  onCloseUpdatePersonalInfoForm($event: any) {
    this.isUpdatePersonalInfo = $event;
  }

  onCloseAddSecondaryEmailAddressForm($event: any) {
    this.isAddSecondaryEmailAddress = $event;
  }

  onCloseResetPasswordForm($event: any) {
    this.isResetPassword = $event;
  }

  onSetNewPassword() {
    this.isSetNewPassword = true;
    this.isVerifyEmailCode = false;
  }

  getUserDetails() {
    this.userByIdEmail$.subscribe({
      next: (response: any) => {
        this.prefillData(response);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  prefillData(Data: any) {
    this.userDetails = Data;
  }
  onSendVerificationCode(Email: string) {
    if (Email) {
      this.isSubmittingForm = true
      this._authSvc.forgotPassword_RequestVerification(Email).subscribe({
        next: (response: any) => {
          if (response) {
            this.ResponseMessage = response.ResponseMessage;
            this.isSubmittingForm = false
            this._toastrSvc.success(response.ResponseMessage)
            setTimeout(() => {
              this.ResponseMessage = '';
              this.isVerifyEmailCode = true;
            }, 2500);
            if (response.ResponseCode === 'ERR') {
              return;
            }

            if (response.ResponseMessage === 'Email not found!') {
              return;
            }
          }
        },
        error: (error) => {
          this.errorMsg = error;
          this.isSubmittingForm = true
          this._toastrSvc.error(error.statusText)
          console.warn('error: ', this.errorMsg);
          // this._router.navigate(['/password-change-verification']);
        },
      });
    }
  }
}
