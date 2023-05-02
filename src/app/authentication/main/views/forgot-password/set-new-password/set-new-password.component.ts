import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
/*
 *@param form
 */
function passwordMatchValidator(form: any) {
  const Password = form.get('Password');
  const ConfirmPassword = form.get('ConfirmPassword');

  if (Password.value != ConfirmPassword.value) {
    ConfirmPassword.setErrors({ PasswordsMatch: true });
  } else {
    ConfirmPassword.setErrors(null);
  }
  return null;
}
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  SetNewPasswordForm!: FormGroup;
  responseMessage: any;
  ResponseCode!: boolean;
  userEmail!: string;
  behaviouralSbjCOde: any;
  failureRequest!: string;
  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    // this.getUserData();
  }

  buildForm() {
    this.SetNewPasswordForm = this._fb.group(
      {
        Password: [
          'Swordfish01@',
          // [Validators.required, symbolValidator, Validators.minLength(4)],
          [Validators.required, Validators.minLength(8)],
        ],
        ConfirmPassword: 'Swordfish01@',
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  getUserData() {
    const data = this._authSvc.getUserData();
    this.userEmail = data.Email;
  }

  setNewPassword() {
    this._route.paramMap.subscribe((params) => {
      let email: any = params.get('email');
      let vrcode: any = params.get('vrcode');

      this._authSvc
        .getPasswordVerificationCodeMsg()
        .subscribe((response: any) => {
          this.behaviouralSbjCOde = response;
          if (this.behaviouralSbjCOde === vrcode) {
            const payload: any = {
              password: this.SetNewPasswordForm.controls['Password'].value,
              email: email,
            };
            this._authSvc
              .changeUserPassword(payload.password, email)
              .subscribe({
                next: (response: any) => {
                  if (response) {
                    this.responseMessage = response.ResponseMessage;
                    if (response.ResponseCode === '00') {
                      this.SetNewPasswordForm.reset();
                      this.ResponseCode = true;
                    }
                  }
                },
                error: (err: any) => {
                  console.warn(err);
                },
              });
          } else {
            this.failureRequest = 'Failed attempt!';
          }
        });
    });

    // this._authSvc
    //   .changeUserPassword(payload.password, payload.email)
    //   .subscribe({
    //     next: (response: any) => {
    //
    //       this.responseMessage = response.ResponseMessage;
    //     },
    //     error:(err:any)=>{
    //       console.warn(err);
    //     }
    //   });
  }
}
