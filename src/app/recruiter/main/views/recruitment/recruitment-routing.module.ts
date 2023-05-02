import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateRecruitmentGuard } from 'src/app/services/guards/recruitment/update-recruitment.guard';
import { ApplicantScoreCardComponent } from './applicant-score-card/applicant-score-card.component';
import { CreateScoreComponent } from './applicant-score-card/create-score/create-score.component';
import { RecruiterScorecardComponent } from './applicant-score-card/create-score/recruiter-scorecard/recruiter-scorecard.component';
import { ScoreboardComponent } from './applicant-score-card/scoreboard/scoreboard.component';
import { ApplicationStatusTabGroupComponent } from './application-status-tab-group/application-status-tab-group.component';
import { ApplicantListComponent } from './job-applicants/applicant-list/applicant-list.component';
import { HiredListComponent } from './job-applicants/hired-list/hired-list.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { RejectedListComponent } from './job-applicants/rejected-list/rejected-list.component';
import { ShortlistedListComponent } from './job-applicants/shortlisted-list/shortlisted-list.component';
import { ClosedRecruitmentComponent } from './recruitment-list/closed-recruitment/closed-recruitment.component';
import { OngoingRecruitmentComponent } from './recruitment-list/ongoing-recruitment/ongoing-recruitment.component';
import { RecruitmentListComponent } from './recruitment-list/recruitment-list.component';
import { RecruitmentComponent } from './recruitment.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { ShortlistCandidatesComponent } from './shortlist-candidates/shortlist-candidates.component';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: RecruitmentListComponent,
      },
      {
        path: 'job-applicants/:JobId/:CompanyId',
        // canActivate: [UpdateRecruitmentGuard],
        component: JobApplicantsComponent,
        children: [
          {
            path: '',
            component: ApplicationStatusTabGroupComponent,
            children: [
              {
                path: '',
                component: ApplicantListComponent,
              },
              // {
              //   path: 'applicants',
              //   component: ApplicantListComponent,
              // },
              {
                path: 'shortlisted',
                component: ShortlistedListComponent,
              },
              {
                path: 'hired',
                component: HiredListComponent,
              },
              {
                path: 'rejected',
                component: RejectedListComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'score-card/:CandidateId',
        component: ApplicantScoreCardComponent,
      },
      { path: 'score-card/scoreboard', component: ScoreboardComponent },
      {
        path: 'create-score/:applicantId/:vacancyId',
        component: CreateScoreComponent,
      },
      {
        path: 'candidates/:vacancyId',
        component: ShortlistCandidatesComponent,
      },
      { path: 'requisitions', component: RequisitionsComponent },
    ],
  },
  // { path: 'job-applicants/:JobId', component: JobApplicantsComponent },

  // {
  //   path: 'job-applicants',
  //   loadChildren: () =>
  //     import('./job-applicants/job-applicants.module').then(
  //       (m) => m.JobApplicantsModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitmentRoutingModule {}
