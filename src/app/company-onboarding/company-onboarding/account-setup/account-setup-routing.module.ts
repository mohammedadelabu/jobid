import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import { SteppersComponent } from './account-setup/steppers/steppers.component';

const routes: Routes = [
  {
    path: '', component: AccountSetupComponent, 
    children: [
      { path: '', component: SteppersComponent },
      { path: 'stepper', component: SteppersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSetupRoutingModule { }
