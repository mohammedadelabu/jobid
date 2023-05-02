import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentListComponent } from './recruitment-list/recruitment-list.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { OngoingRecruitmentComponent } from './recruitment-list/ongoing-recruitment/ongoing-recruitment.component';
import { ClosedRecruitmentComponent } from './recruitment-list/closed-recruitment/closed-recruitment.component';
import { NavigationComponent } from './recruitment-list/navigation/navigation.component';
import { JobApplicantsModule } from './job-applicants/job-applicants.module';
import { CompanyModule } from '../company/company.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicantScoreCardComponent } from './applicant-score-card/applicant-score-card.component';
import { ScoreboardComponent } from './applicant-score-card/scoreboard/scoreboard.component';
import { CreateScoreComponent } from './applicant-score-card/create-score/create-score.component';
import { RecruiterScorecardComponent } from './applicant-score-card/create-score/recruiter-scorecard/recruiter-scorecard.component';
import { TechnicalScorecardComponent } from './applicant-score-card/create-score/technical-scorecard/technical-scorecard.component';
import { ProcessProcessorWidgetComponent } from './process-processor-widget/process-processor-widget.component';
import { UpdateRecruitionStatusComponent } from './recruitment-list/update-recruition-status/update-recruition-status.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { AddRequisitionComponent } from './requisitions/add-requisition/add-requisition.component';
import { UpdateRequisitionComponent } from './requisitions/update-requisition/update-requisition.component';
import { UpdateRequisitionStatusComponent } from './requisitions/update-requisition-status/update-requisition-status.component';
import { RequisitionStatusButtonComponent } from './requisitions/requisition-status-button/requisition-status-button.component';
import { UpdateSourceWeekComponent } from './requisitions/update-source-week/update-source-week.component';
import { ShortlistCandidatesComponent } from './shortlist-candidates/shortlist-candidates.component';
import { ApplicationStatusTabGroupComponent } from './application-status-tab-group/application-status-tab-group.component';

@NgModule({
  declarations: [
    RecruitmentComponent,
    RecruitmentListComponent,
    // JobApplicantsComponent,
    OngoingRecruitmentComponent,
    ClosedRecruitmentComponent,
    NavigationComponent,
    ApplicantScoreCardComponent,
    ScoreboardComponent,
    CreateScoreComponent,
    RecruiterScorecardComponent,
    TechnicalScorecardComponent,
    ProcessProcessorWidgetComponent,
    UpdateRecruitionStatusComponent,
    RequisitionsComponent,
    AddRequisitionComponent,
    UpdateRequisitionComponent,
    UpdateRequisitionStatusComponent,
    RequisitionStatusButtonComponent,
    UpdateSourceWeekComponent,
    ShortlistCandidatesComponent,
    ApplicationStatusTabGroupComponent,
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    NgMaterialModule,
    // JobApplicantsModule,
    CompanyModule,
    JobApplicantsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class RecruitmentModule {}
