import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AccountModule } from './main/views/account/account.module';
import { ProfileSetupModule } from './main/views/profile-setup/profile-setup.module';
import { CandidateRoutingModule } from './candidate-routing.module';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    AccountModule,
    ProfileSetupModule,
  ]
})
export class CandidateModule { }
