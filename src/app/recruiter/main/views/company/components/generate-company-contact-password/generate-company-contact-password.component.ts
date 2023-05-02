import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-company-contact-password',
  templateUrl: './generate-company-contact-password.component.html',
  styleUrls: ['./generate-company-contact-password.component.scss']
})
export class GenerateCompanyContactPasswordComponent implements OnInit {
  isPasswordInput: boolean = true;
  control: string = 'password';
  constructor() {}

  ngOnInit(): void {
    this.control = 'password';
  }

  passwordInputToggler() {
    this.isPasswordInput = !this.isPasswordInput;
    if (!this.isPasswordInput) {
      this.control = 'text';
    } else {
      this.control = 'password';
    }
  }

}
