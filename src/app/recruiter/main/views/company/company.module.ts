import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { InviteCompanyFormComponent } from './components/invite-company-form/invite-company-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCompanyContactComponent } from './add-company-contact/add-company-contact.component';
import { AddCompanyContactComponentDialog } from './components/add-company-contact/add-company-contact.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { GetCompanyContactComponent } from './company-list/get-company-contact/get-company-contact.component';
import { CompanyContactListDialogComponent } from './company-list/company-contact-list-dialog/company-contact-list-dialog.component';
import { JobApplicantsComponent } from './company-details/job-applicants/job-applicants.component';
import { CompanyAttachedDocumentsComponent } from './company-attached-documents/company-attached-documents.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { CompanyUploadDocumentDialogComponent } from './company-attached-documents/company-upload-document-dialog/company-upload-document-dialog.component';
import { CompanyViewDocumentDialogComponent } from './company-attached-documents/company-view-document-dialog/company-view-document-dialog.component';
import { CompanyVacancyHistoryComponent } from './company-details/company-vacancy-history/company-vacancy-history.component';
import { CompanyVacancyListComponent } from './company-details/company-vacancy-history/company-vacancy-list/company-vacancy-list.component';
import { CompanyMessengerComponent } from './company-messenger/company-messenger.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    CompanyListComponent,
    AddCompanyContactComponent,
    AddCompanyContactComponentDialog,
    InviteCompanyFormComponent,
    EditCompanyComponent,
    GetCompanyContactComponent,
    CompanyContactListDialogComponent,
    JobApplicantsComponent,
    CompanyAttachedDocumentsComponent,
    CompanyUploadDocumentDialogComponent,
    CompanyViewDocumentDialogComponent,
    CompanyVacancyHistoryComponent,
    CompanyVacancyListComponent,
    CompanyMessengerComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    // SharedModule,
    MatDialogModule,
    // FormsModule,
    // ReactiveFormsModule,
    SharedModule,
    NgMaterialModule,
  ],
  exports:[GetCompanyContactComponent, JobApplicantsComponent, CompanyVacancyHistoryComponent]
})
export class CompanyModule {}
