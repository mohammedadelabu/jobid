import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSetupRoutingModule } from './account-setup-routing.module';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import { SteppersComponent } from './account-setup/steppers/steppers.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { ModuleSelectionFormComponent } from './account-setup/steppers/module-selection-form/module-selection-form.component';
import { NumberOfEmployeesFormComponent } from './account-setup/steppers/number-of-employees-form/number-of-employees-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionPlanFormComponent } from './account-setup/steppers/subscription-plan-form/subscription-plan-form.component';


@NgModule({
  declarations: [
    AccountSetupComponent,
    SteppersComponent,
    ModuleSelectionFormComponent,
    NumberOfEmployeesFormComponent,
    SubscriptionPlanFormComponent
  ],
  imports: [
    CommonModule,
    AccountSetupRoutingModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountSetupModule { }
