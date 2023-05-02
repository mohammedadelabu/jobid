import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ShortlistedListComponent } from './shortlisted-list/shortlisted-list.component';
import { HiredListComponent } from './hired-list/hired-list.component';
import { JobApplicantsNavigationComponent } from './job-applicants-navigation/job-applicants-navigation.component';
import { JobApplicantsRoutingModule } from './job-applicants-routing.module';
import { JobApplicantsComponent } from './job-applicants.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTabsModule } from '@angular/material/tabs';
import { GetJobApplicantsComponent } from './get-job-applicants/get-job-applicants.component';
import { ApplicantLocationComponent } from './applicant-list/applicant-location/applicant-location.component';
import { ScheduleInterviewButtonComponent } from './applicant-list/recruiter-action-buttons/schedule-interview-button/schedule-interview-button.component';
import { CheckJobApplicationStageComponent } from './applicant-list/check-job-application-stage/check-job-application-stage.component';
import { RejectCandidateButtonComponent } from './applicant-list/recruiter-action-buttons/reject-candidate-button/reject-candidate-button.component';
import { ShortlistCandidateButtonComponent } from './applicant-list/recruiter-action-buttons/shortlist-candidate-button/shortlist-candidate-button.component';
import { ApplicationProcessCountComponent } from './applicant-list/application-process-count/application-process-count.component';
import { ProceedToNextStageButtonComponent } from './applicant-list/recruiter-action-buttons/proceed-to-next-stage-button/proceed-to-next-stage-button.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { DeleteApplicationButtonComponent } from './applicant-list/recruiter-action-buttons/delete-application-button/delete-application-button.component';
import { HireApplicationButtonComponent } from './applicant-list/recruiter-action-buttons/hire-application-button/hire-application-button.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckExternalJobApplicationStageComponent } from './applicant-list/check-external-job-application-stage/check-external-job-application-stage.component';

@NgModule({
  declarations: [
    JobApplicantsComponent,
    ApplicantListComponent,
    ShortlistedListComponent,
    HiredListComponent,
    JobApplicantsNavigationComponent,
    GetJobApplicantsComponent,
    ApplicantLocationComponent,
    ScheduleInterviewButtonComponent,
    CheckJobApplicationStageComponent,
    RejectCandidateButtonComponent,
    ShortlistCandidateButtonComponent,
    ApplicationProcessCountComponent,
    ProceedToNextStageButtonComponent,
    RejectedListComponent,
    DeleteApplicationButtonComponent,
    HireApplicationButtonComponent,
    CheckExternalJobApplicationStageComponent,
  ],
  imports: [
    CommonModule,
    JobApplicantsRoutingModule,
    CdkAccordionModule,
    MatTabsModule,
    SharedModule,
  ],
  exports: [GetJobApplicantsComponent, ApplicantLocationComponent],
})
export class JobApplicantsModule {}
