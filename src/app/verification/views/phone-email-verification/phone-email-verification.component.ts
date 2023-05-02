import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateUser } from 'src/app/models/types/user';
import {
  AuthenticationService,
  VerifyPhone,
} from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-phone-email-verification',
  templateUrl: './phone-email-verification.component.html',
  styleUrls: ['./phone-email-verification.component.scss'],
})
export class PhoneEmailVerificationComponent implements OnInit, OnDestroy {
  Email!: string;
  Phone!: string;
  errorMsg: any;
  ResponseMessage: any;
  isEmailVerificationCodeSent: boolean = false;
  emailVerificationResponseMessage!: string;
  isEmailVerified!: boolean;
  isPhoneNumberVerified!: boolean;
  UserDetails: any;
  PhoneNumberResponseMessage!: string;
  isPhoneNumberVerificationCodeSent!: boolean;
  phoneNumberVerificationResponseMessage!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authSvc: AuthenticationService,
    private _identitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    this.onGetParams();
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (response: any) => {
        
        let candidateEmail = response.get('email');
        let candidatePhone = response.get('phone');
        this.Email = candidateEmail;
        this.Phone = candidatePhone;
        this.onGetUserDetails(candidateEmail);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetUserDetails(UserEmail: string) {
    let subscription = this._identitySvc.getUserByEmail(UserEmail).subscribe({
      next: (response: any) => {        
        this.UserDetails = { ...response };
        this.onCheckVerification(
          this.UserDetails?.isEmailVerified,
          this.UserDetails?.isPhoneNumberVerified
        );
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  // updateUser(userData: any) {
  //   const Payload = {
  //     FirstName: userData.FirstName,
  //     LastName: userData.LastName,
  //     MiddleName: userData.MiddleName,
  //     UserImage: userData.UserImage,
  //     ProofOfResidence: userData.ProofOfResidence,
  //     GovernmentId: userData.GovernmentId,
  //     PhoneNumber: userData.PhoneNumber,
  //     DateOfBirth: userData.DateOfBirth,
  //     CompanyId: userData.CompanyId,
  //     Status: userData.Status,
  //     StatusComment: userData.StatusComment,
  //     CV_URL: userData.CV_URL,
  //     PortfolioPlatform: userData.PortfolioPlatform,
  //     LinkedinPlatform: userData.LinkedinPlatform,
  //     UpdatedBy: userData.UpdatedBy,
  //     IsVerified: userData.IsVerified,
  //     NewReference: userData.NewReference,
  //   };

  //   return Payload;
  // }

  updateUserIsPhoneNumberVerified(userData: any) {
    const Payload: UpdateUser = {
      FirstName: userData.FirstName,
      LastName: userData.LastName,
      MiddleName: userData.MiddleName,
      UserImage: userData.UserImage,
      ProofOfResidence: userData.ProofOfResidence,
      GovernmentId: userData.GovernmentId,
      PhoneNumber: userData.PhoneNumber,
      DateOfBirth: userData.DateOfBirth,
      CompanyId: userData.CompanyId,
      Status: userData.Status,
      StatusComment: userData.StatusComment,
      CV_URL: userData.CV_URL,
      PortfolioPlatform: userData.PortfolioPlatform,
      LinkedinPlatform: userData.LinkedinPlatform,
      UpdatedBy: userData.UpdatedBy,
      IsVerified: userData.IsVerified,
      NewReference: userData.NewReference,
      IsEmailVerified: userData.IsEmailVerified,
      IsPhoneNumberVerified: true,
    };

    return Payload;
  }

  updateUserIsEmailVerified(userData: any) {
    const Payload: UpdateUser = {
      FirstName: userData.FirstName,
      LastName: userData.LastName,
      MiddleName: userData.MiddleName,
      UserImage: userData.UserImage,
      ProofOfResidence: userData.ProofOfResidence,
      GovernmentId: userData.GovernmentId,
      PhoneNumber: userData.PhoneNumber,
      DateOfBirth: userData.DateOfBirth,
      CompanyId: userData.CompanyId,
      Status: userData.Status,
      StatusComment: userData.StatusComment,
      CV_URL: userData.CV_URL,
      PortfolioPlatform: userData.PortfolioPlatform,
      LinkedinPlatform: userData.LinkedinPlatform,
      UpdatedBy: userData.UpdatedBy,
      IsVerified: userData.IsVerified,
      NewReference: userData.NewReference,
      IsEmailVerified: true,
      IsPhoneNumberVerified: userData.IsPhoneNumberVerified,
    };

    return Payload;
  }

  onCheckVerification(
    isEmailVerified: boolean,
    isPhoneNumberVerified: boolean
  ) {
    if (isEmailVerified && isPhoneNumberVerified) {
      this._router.navigate(['/']);
    }
  }

  onSubmit(FormsData: any) {
    
    // this._router.navigate(['/verification/phone-email-verification']);
    const Payload: any = {
      email: FormsData.value.VerifyEmail,
    };
    
    let subscription = this._authSvc
      .EmailVerificationRequest(Payload.email)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this.ResponseMessage = response.ResponseMessage;
            this.isEmailVerificationCodeSent = true;
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
              // this._router.navigate([`/auth/verification/${this.Email}`]);
            }, 2000);
          }
        },
        error: (error) => {
          this.errorMsg = error;
          console.warn('error: ', this.errorMsg);
          // this._router.navigate(['/password-change-verification']);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmitPhone(FormsData: any) {
    
    // this._router.navigate(['/verification/phone-email-verification']);
    let phone = FormsData.value.VerifyPhone.trim();
    const Payload: VerifyPhone = {
      email: this.Email,
      // phonumber: "+" + FormsData.value.VerifyPhone.trim(),
      // phonumber: phone,
      phonumber: encodeURIComponent(FormsData.value.VerifyPhone),
    };
    let subscription = this._authSvc
      .PhoneVerificationRequest(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this.PhoneNumberResponseMessage = response.ResponseMessage;
            this.isPhoneNumberVerificationCodeSent = true;
            setTimeout(() => {
              this.PhoneNumberResponseMessage = '';
            }, 5000);
            if (response.ResponseCode === 'ERR') {
              return;
            }

            if (response.ResponseMessage === 'Phone number not found!') {
              return;
            }
            setTimeout(() => {
              // this._router.navigate(['/authenticate-user/password-change-verification']);
              // this._router.navigate([`/auth/verification/${this.Email}`]);
            }, 2000);
          }
        },
        error: (error: any) => {
          this.errorMsg = error;
          console.warn('error: ', this.errorMsg);
          // this._router.navigate(['/password-change-verification']);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmitEmailCode(verifyEmailCodeForm: any) {
    const data = {
      VerificationCode: verifyEmailCodeForm.value.VerificationCode,
      Email: this.Email,
    };
    let subscription = this._authSvc
      .VerifyEmailVerificationRequest(data, this.Email)
      .subscribe({
        next: (response: any) => {
          
          if (response.ResponseCode == '00') {
            (this.emailVerificationResponseMessage =
              'Email address is verified!'),
              verifyEmailCodeForm.reset();
            this.isEmailVerified = true;
            if (this.isEmailVerified) {
              this.updateUserIsEmailVerified(this.UserDetails);
            }
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }
  onSubmitPhoneNumberCode(verifyPhoneNumberCodeForm: any) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
