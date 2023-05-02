import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ApplicationsComponent } from './sections/applications/applications.component';
import { DashboardComponent } from './sections/dashboard/dashboard.component';
import { MyProfileComponent } from './sections/my-profile/my-profile.component';
import { PlacementComponent } from './sections/placement/placement.component';
import { ProjectComponent } from './sections/project-management/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile/:candidateId/:candidateEmail',
        component: MyProfileComponent,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'placement',
        component: PlacementComponent,
      },
      // {
      //   path: 'project-management',
      //   loadChildren: () =>
      //     import('./sections/project-management/project-management.module').then(
      //       (m) => m.ProjectManagementModule
      //     ),
      // },
      {
        path: 'project-management',
        component: ProjectComponent,
      },
      // {
      //   path: 'personal-profile',
      //   component: PersonalProfileComponent,
      // },
      // {
      //   path: 'work-history',
      //   component: WorkHistoryComponent,
      // },
      // {
      //   path: 'education',
      //   component: EducationComponent,
      // },
      // {
      //   path: 'skills',
      //   component: SkillsComponent,
      // },
      // {
      //   path: 'projects',
      //   component: ProjectsComponent,
      // },
      // {
      //   path: 'others',
      //   component: OthersComponent,
      // },
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
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
