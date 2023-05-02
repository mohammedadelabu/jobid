import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],
})
export class GeneratePasswordComponent implements OnInit {
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
