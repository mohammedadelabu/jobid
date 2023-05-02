import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthVerificationCodeGuard } from '../services/guards/auth-verification-code.guard';
import { MainComponent } from './main/main.component';
import { ForgotPasswordComponent } from './main/views/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './main/views/forgot-password/set-new-password/set-new-password.component';
import { VerificationComponent } from './main/views/forgot-password/verification/verification.component';
import { LoginComponent } from './main/views/login/login.component';
import { RegisterAdminComponent } from './main/views/register-admin/register-admin.component';
import { RegisterComponent } from './main/views/register/register.component';
import { TestingComponent } from './main/views/testing/testing.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'register-admin',
        component: RegisterAdminComponent,
      },
      {
        path: 'testing',
        component: TestingComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verification/:email',
        component: VerificationComponent,
      },
      {
        path: 'set-new-password/:email/:vrcode',
        // canActivate: [AuthVerificationCodeGuard],
        component: SetNewPasswordComponent,
      },
      // {path: '', component: PersonalProfileComponent}
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'register-admin',
  //   component: RegisterAdminComponent
  // },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path: 'verification/:email',
  //   component: VerificationComponent
  // },
  // {
  //   path: 'set-new-password/:email/:vrcode',
  //   // canActivate: [AuthVerificationCodeGuard],
  //   component: SetNewPasswordComponent,
  // },
  // // {path: '', component: PersonalProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
