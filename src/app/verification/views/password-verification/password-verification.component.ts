import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.scss'],
})
export class PasswordVerificationComponent implements OnInit {
  ControlType1 = 'password';
  ControlType2 = 'password';
  isText1 = false;
  isText2 = false;
  constructor() {}

  ngOnInit(): void {}

  onToggleType1() {
    if (!this.isText1) {
      this.ControlType1 = 'text';
      this.isText1 = true;
    } else {
      this.ControlType1 = 'password';
      this.isText1 = false;
    }
  }

  onToggleType2() {
    if (!this.isText2) {
      this.ControlType2 = 'text';
      this.isText2 = true;
    } else {
      this.ControlType2 = 'password';
      this.isText2 = false;
    }
  }
  onSubmit(verifyPasswordForm: any) {
    console.log('verifyPasswordForm: ', verifyPasswordForm.value);
  }
}
