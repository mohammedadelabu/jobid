import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUploadCandidateCvComponent } from './admin-upload-candidate-cv/admin-upload-candidate-cv.component';
import { UploadedCvRegistrationFormComponent } from './admin-upload-candidate-cv/uploaded-cv-registration-form/uploaded-cv-registration-form.component';
import { AttachedDocumentsComponent } from './attached-documents/attached-documents.component';
import { CandidateCvPreviewComponent } from './candidate-listing/candidate-cv-preview/candidate-cv-preview.component';
import { CandidateDetailsComponent } from './candidate-listing/candidate-details/candidate-details.component';
import { CandidateMessengerComponent } from './candidate-listing/candidate-messenger/candidate-messenger.component';
import { CandidatesComponent } from './candidates.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    children: [
      // { path: 'calendar', component: CalendarComponent },
    ],
  },  
  {
    path: 'search/:searchTerm',
    component: CandidatesComponent,
  },  
  { path: 'details/:candidateId', component: CandidateDetailsComponent },
  {
    path: 'messenger/:candidateId/:candidateEmail',
    component: CandidateMessengerComponent,
  },
  {
    path: 'cv-preview/:candidateId',
    component: CandidateCvPreviewComponent,
  },
  {
    path: 'upload-candidate-cv',
    component: AdminUploadCandidateCvComponent,
  },
  {
    path: 'upload-candidate-cv/registration',
    component: UploadedCvRegistrationFormComponent,
  },
  {
    path: 'attached-documents/:candidateId',
    component: AttachedDocumentsComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
