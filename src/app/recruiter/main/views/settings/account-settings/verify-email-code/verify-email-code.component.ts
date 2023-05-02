import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verify-email-code',
  templateUrl: './verify-email-code.component.html',
  styleUrls: ['./verify-email-code.component.scss'],
})
export class VerifyEmailCodeComponent implements OnInit {
  @Input() userEmail!: string;
  @Output() onSetNewPassword = new EventEmitter<boolean>();
  requestVerificationForm!: FormGroup;
  responseMessage: any;
  responseMessageErr: any;
  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.requestVerificationForm = this._fb.group({
      // Email: ['', Validators.required],
      VerificationCode: ['', Validators.required],
    });
  }

  // private vrCodeId:string = new Date().getTime().toString();
  // localStorage.setItem(this.vrCodeId, msg);

  verifyEmail() {
    const vrCode =
      this.requestVerificationForm.controls['VerificationCode'].value;
    const data = {
      VerificationCode:
        this.requestVerificationForm.controls['VerificationCode'].value,
      Email: this.userEmail,
    };
    this._authSvc.verifyCodeToChangePassword(data, data.Email).subscribe({
      next: (response: any) => {
        if (response.ResponseCode == 'ERR') {
          this.responseMessageErr = response.ResponseMessage;
          setTimeout(() => {
            this.responseMessageErr = '';
          }, 4500);
        }
        if (response.ResponseCode == '00') {
          this.responseMessage = response.ResponseMessage;
          // localStorage.setItem('verificationCode', vrCode);
          // this._authSvc.setPasswordVerificationCodeMsg(vrCode);
          setTimeout(() => {
            this.onSetNewPassword.emit(false);
          }, 2500);
        }
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }
}
