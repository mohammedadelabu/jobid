import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() closeResetPasswordForm = new EventEmitter();
  @Input() userEmail!: string;
  SetNewPasswordForm!: FormGroup;
  responseMessage: any;
  ResponseCode!: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.SetNewPasswordForm = this._fb.group(
      {
        Password: [
          '',
          // [Validators.required, symbolValidator, Validators.minLength(4)],
          [Validators.required, Validators.minLength(8)],
        ],
        ConfirmPassword: '',
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  onSetNewPassword() {
    const payload: any = {
      newPassword: this.SetNewPasswordForm.controls['Password'].value,
      email: this.userEmail,
    };
    this._authSvc._changeUserPassword(payload).subscribe({
      next: (response: any) => {
        if (response) this.responseMessage = response.ResponseMessage;
        if (response.ResponseCode === '00') this.SetNewPasswordForm.reset();
        this.ResponseCode = true;
        setTimeout(() => {
          localStorage.clear();
          this._router.navigate(['/auth']);
        }, 2500);
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }

  onCloseUpdatePersonalInfoForm_() {
    this.closeResetPasswordForm.emit(false);
  }
}
