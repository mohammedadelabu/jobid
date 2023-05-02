import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { SharedModule } from '../shared/shared.module';
import { EditCandidateCvModule } from './edit-candidate-cv/edit-candidate-cv.module';
import { InviteCandidateFormComponent } from './main/components/invite-candidate-form/invite-candidate-form.component';
import { SidebarComponent } from './main/components/sidebar/sidebar.component';
import { ToolbarComponent } from './main/components/toolbar/toolbar.component';
import { MainComponent } from './main/main.component';
import { CandidateCvPreviewComponent } from './main/views/candidates/candidate-listing/candidate-cv-preview/candidate-cv-preview.component';
import { CandidateItemComponent } from './main/views/candidates/candidate-listing/candidate-item/candidate-item.component';
import { CandidatePortfolioLinkedinComponent } from './main/views/candidates/candidate-listing/candidate-item/candidate-portfolio-linkedin/candidate-portfolio-linkedin.component';
import { CandidateProfileComponent } from './main/views/candidates/candidate-listing/candidate-item/candidate-profile/candidate-profile.component';
import { CandidateListingComponent } from './main/views/candidates/candidate-listing/candidate-listing.component';
import { AdminCreateNewCandidateAccountComponent } from './main/views/candidates/components/admin-create-new-candidate-account/admin-create-new-candidate-account.component';
import { CompanyDetailsComponent } from './main/views/company/company-details/company-details.component';
import { CompanyModule } from './main/views/company/company.module';
import { EditCompanyContactComponent } from './main/views/company/components/edit-company-contact/edit-company-contact.component';
import { GenerateCompanyContactPasswordComponent } from './main/views/company/components/generate-company-contact-password/generate-company-contact-password.component';
import { ResetCompanyContactPasswordComponent } from './main/views/company/components/reset-company-contact-password/reset-company-contact-password.component';
import { CrmComponent } from './main/views/crm/crm.component';
import { AddInterviewProcessComponent } from './main/views/job-board/post-job/add-interview-process/add-interview-process.component';
import { PostJobComponent } from './main/views/job-board/post-job/post-job.component';
import { NotificationComponent } from './main/views/notification/notification.component';
import { FilterComponent } from './main/views/search-results/filter/filter.component';
import { SearchResultsComponent } from './main/views/search-results/search-results.component';
import { SkillSearchResultsComponent } from './main/views/search-results/skill-search-results/skill-search-results.component';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { NewSidebarComponent } from './main/components/new-sidebar/new-sidebar.component';
import { SecondaryNavComponent } from './main/components/secondary-nav/secondary-nav.component';

@NgModule({
  declarations: [
    SidebarComponent,
    MainComponent,
    ToolbarComponent,
    InviteCandidateFormComponent, 
    CandidateListingComponent, 
    CandidateItemComponent, 
    // CandidateDetailsComponent, 
    // CandidateProfileComponent,
    // CandidateProfessionComponent,
    // RelatedCandidatesComponent,
    // CandidateMessengerComponent,
    CandidateCvPreviewComponent,
    // CandidatePortfolioLinkedinComponent,
    SearchResultsComponent,
    CompanyDetailsComponent,
    EditCompanyContactComponent,
    ResetCompanyContactPasswordComponent,
    GenerateCompanyContactPasswordComponent,
    AdminCreateNewCandidateAccountComponent,
    PostJobComponent,
    AddInterviewProcessComponent,
    SkillSearchResultsComponent,
    FilterComponent,
    CrmComponent,
    NotificationComponent,
    NewSidebarComponent,
    SecondaryNavComponent,
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EditorModule,
    NgMaterialModule,
    EditCandidateCvModule,
    // JobBoardModule,
    CompanyModule,
    // ShareButtonsModule.withConfig({
    //   debug: true
    // }),
    ShareButtonsModule,
    ShareIconsModule,
  ],
  exports:[
    // CandidateProfileComponent,
    // CandidatePortfolioLinkedinComponent,
    ToolbarComponent
  ],
  providers: [],
})
export class RecruiterModule {}
