import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateGuard } from '../services/guards/candidate/candidate.guard';
import { CompanyGuard } from '../services/guards/company/company.guard';
import { CrmGuard } from '../services/guards/crm/crm.guard';
import { PlacementGuard } from '../services/guards/placement/placement.guard';
import { ProjectManagementGuard } from '../services/guards/project-management/project-management.guard';
import { MainComponent } from './main/main.component';
import { NotificationComponent } from './main/views/notification/notification.component';
import { SearchResultsComponent } from './main/views/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'hello-world',
        loadChildren: () =>
          import(
            './main/views/hello-world-sample/hello-world-sample.module'
          ).then((m) => m.HelloWorldSampleModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./main/views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'employee-management',
        loadChildren: () =>
          import('./main/views/employee-management/employee-management.module').then(
            (m) => m.EmployeeManagementModule
          ),
      },
      {
        path: 'candidates',
        canActivateChild: [CandidateGuard],
        loadChildren: () =>
          import('./main/views/candidates/candidates.module').then(
            (m) => m.CandidatesModule
          ),
      },
      // { path: 'candidates/:candidateId', component: CandidateDetailsComponent },
      // {
      //   path: 'candidates/messenger/:candidateId',
      //   component: CandidateMessengerComponent,
      // },
      // {
      //   path: 'candidates/cv-preview/:candidateId',
      //   component: CandidateCvPreviewComponent,
      // },
      // {
      //   path: 'company',
      //   canActivateChild: [CompanyGuard],
      //   loadChildren: () =>
      //     import('./main/views/company/company.module').then(
      //       (m) => m.CompanyModule
      //     ),
      // },
      // {
      //   path: 'job-board',
      //   loadChildren: () =>
      //     import('./main/views/job-board/job-board.module').then(
      //       (m) => m.JobBoardModule
      //     ),
      // },
      // {
      //   path: 'recruitment',
      //   // canActivateChild: [RecruitmentGuard],
      //   loadChildren: () =>
      //     import('./main/views/recruitment/recruitment.module').then(
      //       (m) => m.RecruitmentModule
      //     ),
      // },
      {
        path: 'crm',
        canActivateChild: [CrmGuard],
        loadChildren: () =>
          import('./main/views/crm/crm.module').then((m) => m.CrmModule),
      },
      // {
      //   path: 'placement',
      //   canActivateChild: [PlacementGuard],
      //   loadChildren: () =>
      //     import('./main/views/placement/placement.module').then(
      //       (m) => m.PlacementModule
      //     ),
      // },
      {
        path: 'project-management',
        canActivateChild: [ProjectManagementGuard],
        loadChildren: () =>
          import(
            './main/views/project-management/project-management.module'
          ).then((m) => m.ProjectManagementModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./main/views/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./main/views/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./main/views/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      { path: 'search', component: SearchResultsComponent },
      { path: 'search/:searchTerm', component: SearchResultsComponent },
      { path: 'notifications', component: NotificationComponent },
      // {path: 'skills/search/:searchTerm', component: SkillSearchResultsComponent},
      // {path: 'skills/search/:searchTerm', component: SearchResultsComponent},
      // {path: 'flagged/search/:searchTerm', component: SearchResultsComponent},
      {
        path: 'search/:searchTerm?status=blocked',
        component: SearchResultsComponent,
      },
      // {path: 'search/:searchTerm/:candidates', component: SearchResultsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
