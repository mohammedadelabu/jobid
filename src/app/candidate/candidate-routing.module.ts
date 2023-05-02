import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/views/account/sections/dashboard/dashboard.component';
// import { DashboardComponent } from './main/views/candidate-dashboard/dashboard.component';
// import { ProfileSetupComponent } from './main/views/profile-setup/profile-setup.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./main/views/candidate-dashboard/candidate-dashboard.module').then(
      //       (m) => m.CandidateDashboardModule
      //     ),
      // }
    ],
  },

  // {
  //   path: 'profile-setup', component: ProfileSetupComponent
  // }  ,
  {
    path: 'account',
    loadChildren: () =>
      import('./main/views/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'profile-setup',
    loadChildren: () =>
      import('./main/views/profile-setup/profile-setup.module').then(
        (m) => m.ProfileSetupModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
