import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyOnboardingComponent } from './company-onboarding/company-onboarding.component';

const routes: Routes = [
  {
    path: '', component: CompanyOnboardingComponent,
    children: [
      {
        path: 'account-setup',
        loadChildren: () =>
          import('./company-onboarding/account-setup/account-setup.module').then(
            (m) => m.AccountSetupModule
          ),
      },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyOnboardingRoutingModule { }
