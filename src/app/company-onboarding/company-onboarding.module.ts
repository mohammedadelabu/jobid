import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyOnboardingRoutingModule } from './company-onboarding-routing.module';
import { CompanyOnboardingComponent } from './company-onboarding/company-onboarding.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyOnboardingComponent
  ],
  imports: [
    CommonModule,
    CompanyOnboardingRoutingModule,
    FormsModule
  ]
})
export class CompanyOnboardingModule { }
