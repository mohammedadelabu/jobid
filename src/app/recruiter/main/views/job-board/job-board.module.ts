import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobBoardRoutingModule } from './job-board-routing.module';
import { JobBoardComponent } from './job-board.component';
import { AddInterviewQuestionComponent } from './post-job/add-interview-question/add-interview-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobInterviewProcessComponent } from './job-interview-process/job-interview-process.component';
import { UpdateInterviewProcessComponent } from './job-interview-process/update-interview-process/update-interview-process.component';
import { PreviewInterviewProcessComponent } from './job-interview-process/preview-interview-process/preview-interview-process.component';
import { ApplyForJobComponent } from './job-details/apply-for-job/apply-for-job.component';
import { AddCompanyProcessComponent } from './job-interview-process/add-company-process/add-company-process.component';
import { EditCompanyProcessComponent } from './job-interview-process/edit-company-process/edit-company-process.component';
import { ShareJobComponent } from './share-job/share-job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShareUndisclosedJobComponent } from './share-job/share-undisclosed-job/share-undisclosed-job.component';
import { ShareDisclosedJobComponent } from './share-job/share-disclosed-job/share-disclosed-job.component';
import { MatchedCandidatesComponent } from './job-details/matched-candidates/matched-candidates.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { RelatedJobsComponent } from './related-jobs/related-jobs.component';
import { CandidateProfessionComponent } from '../candidates/candidate-listing/candidate-details/candidate-profession/candidate-profession.component';
import { CandidatesModule } from '../candidates/candidates.module';
import { MatchedSkillsCountComponent } from './job-details/matched-candidates/matched-skills-count/matched-skills-count.component';
import { MultiApplicationRequestComponent } from './job-details/multi-application-request/multi-application-request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApplicationButtonComponent } from './job-details/matched-candidates/application-button/application-button.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { JobDownloadOptionsComponent } from './job-details/job-download-options/job-download-options.component';
import { UndisclosedComponent } from './job-details/job-download-options/undisclosed/undisclosed.component';
import { DisclosedComponent } from './job-details/job-download-options/disclosed/disclosed.component';
import { JobQuestionsComponent } from './job-questions/job-questions.component';
import { AddJobQuestionComponent } from './job-questions/add-job-question/add-job-question.component';
import { PreviewJobQuestionComponent } from './job-questions/preview-job-question/preview-job-question.component';
import { PendingPostsComponent } from './pending-posts/pending-posts.component';
import { JobListsComponent } from './job-lists/job-lists.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

@NgModule({
  declarations: [
    JobBoardComponent,
    AddInterviewQuestionComponent,
    JobInterviewProcessComponent,
    UpdateInterviewProcessComponent,
    PreviewInterviewProcessComponent,
    ApplyForJobComponent,
    AddCompanyProcessComponent,
    EditCompanyProcessComponent,
    ShareJobComponent,
    ShareUndisclosedJobComponent,
    ShareDisclosedJobComponent,
    JobDetailsComponent,
    MatchedCandidatesComponent,
    JobPostsComponent,
    RelatedJobsComponent,
    MatchedSkillsCountComponent,
    MultiApplicationRequestComponent,
    ApplicationButtonComponent,
    JobDownloadOptionsComponent,
    UndisclosedComponent,
    DisclosedComponent,
    JobQuestionsComponent,
    AddJobQuestionComponent,
    PreviewJobQuestionComponent,
    PendingPostsComponent,
    JobListsComponent,
    // CandidateProfessionComponent
  ],
  exports: [
    JobBoardComponent,
    AddInterviewQuestionComponent,
    JobInterviewProcessComponent,
    UpdateInterviewProcessComponent,
    PreviewInterviewProcessComponent,
  ],
  imports: [
    CommonModule,
    JobBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CandidatesModule,
    NgMultiSelectDropDownModule.forRoot(),

    ShareButtonsModule,
    ShareIconsModule,
    NgMaterialModule
  ],
})
export class JobBoardModule {}
