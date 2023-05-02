import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecruiterModule } from 'src/app/recruiter/recruiter.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { CandidatesComponent } from './candidates.component';
import { CandidateDetailsComponent } from './candidate-listing/candidate-details/candidate-details.component';
import { RelatedCandidatesComponent } from './candidate-listing/related-candidates/related-candidates.component';
import { CandidateProfessionComponent } from './candidate-listing/candidate-details/candidate-profession/candidate-profession.component';
import { CandidateMessengerComponent } from './candidate-listing/candidate-messenger/candidate-messenger.component';
import { AdminUploadCandidateCvComponent } from './admin-upload-candidate-cv/admin-upload-candidate-cv.component';
import { UploadedCvRegistrationFormComponent } from './admin-upload-candidate-cv/uploaded-cv-registration-form/uploaded-cv-registration-form.component';
import { AttachedDocumentsComponent } from './attached-documents/attached-documents.component';
import { UploadDocumentDialogComponent } from './attached-documents/upload-document-dialog/upload-document-dialog.component';
import { ViewDocumentDialogComponent } from './attached-documents/view-document-dialog/view-document-dialog.component';
import { FlagBlockDialogComponent } from './candidate-listing/candidate-details/flag-block-dialog/flag-block-dialog.component';
import { CandidateApplicationListComponent } from './candidate-listing/candidate-details/candidate-application-list/candidate-application-list.component';
import { JobVacancyComponent } from './candidate-listing/candidate-details/candidate-application-list/job-vacancy/job-vacancy.component';
import { CandidateApplicationHistoryComponent } from './candidate-listing/candidate-details/candidate-application-history/candidate-application-history.component';
import { RatingsAndReviewsComponent } from './candidate-listing/candidate-details/ratings-and-reviews/ratings-and-reviews.component';
import { StarsCountComponent } from './candidate-listing/candidate-details/ratings-and-reviews/stars-count/stars-count.component';
import { SenderInfoComponent } from './candidate-listing/candidate-details/ratings-and-reviews/sender-info/sender-info.component';

@NgModule({
  declarations: [
    CandidatesComponent,
    CandidateDetailsComponent,
    RelatedCandidatesComponent,
    CandidateMessengerComponent,
    AdminUploadCandidateCvComponent,
    UploadedCvRegistrationFormComponent,
    AttachedDocumentsComponent,
    UploadDocumentDialogComponent,
    ViewDocumentDialogComponent,
    FlagBlockDialogComponent,
    CandidateApplicationListComponent,
    JobVacancyComponent,
    CandidateApplicationHistoryComponent,
    RatingsAndReviewsComponent,
    StarsCountComponent,
    SenderInfoComponent,
    CandidateProfessionComponent,
  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
    RecruiterModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgMaterialModule,
  ],
  exports: [
    CandidateProfessionComponent,
    StarsCountComponent,
    SenderInfoComponent,
  ],
})
export class CandidatesModule {}
