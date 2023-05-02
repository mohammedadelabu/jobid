import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management.component';
import { CandidateGuard } from 'src/app/services/guards/candidate/candidate.guard';
import { PlacementGuard } from 'src/app/services/guards/placement/placement.guard';
import { RecruitmentGuard } from 'src/app/services/guards/recruitment/recruitment.guard';
import { JobBoardGuard } from 'src/app/services/guards/job-board/job-board.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'candidates' },
      {
        path: 'candidates',
        canActivateChild: [CandidateGuard],
        loadChildren: () =>
          import('../candidates/candidates.module').then(
            (m) => m.CandidatesModule
          ),
      },
      {
        path: 'job-board',
        canActivateChild: [JobBoardGuard],
        loadChildren: () =>
          import('../job-board/job-board.module').then((m) => m.JobBoardModule),
      },
      {
        path: 'recruitment',
        canActivateChild: [RecruitmentGuard],
        loadChildren: () =>
          import('../recruitment/recruitment.module').then(
            (m) => m.RecruitmentModule
          ),
      },
      {
        path: 'placement',
        canActivateChild: [PlacementGuard],
        loadChildren: () =>
          import('../placement/placement.module').then(
            (m) => m.PlacementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeManagementRoutingModule {}
