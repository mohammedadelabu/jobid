import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/views/login/login.component';
import { ResetPasswordComponent } from './main/components/reset-password/reset-password.component';
import { GeneratePasswordComponent } from './main/components/generate-password/generate-password.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './main/views/forgot-password/forgot-password.component';
import { VerificationComponent } from './main/views/forgot-password/verification/verification.component';
import { SetNewPasswordComponent } from './main/views/forgot-password/set-new-password/set-new-password.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './main/views/register/register.component';
import { RegisterAdminComponent } from './main/views/register-admin/register-admin.component';
import { TestingComponent } from './main/views/testing/testing.component';



@NgModule({
  declarations: [
    MainComponent,
    ResetPasswordComponent,
    GeneratePasswordComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerificationComponent,
    SetNewPasswordComponent,
    RegisterComponent,
    RegisterAdminComponent,
    TestingComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
