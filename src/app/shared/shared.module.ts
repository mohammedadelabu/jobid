import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StringToArrayPipe } from '../pipes/string-to-array.pipe';
import { SkillTitleComponent } from './components/skill-title/skill-title.component';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { PreviewUploadedCvComponent } from './components/preview-uploaded-cv/preview-uploaded-cv.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { CvViewPageComponent } from './components/cv-view-page/cv-view-page.component';
import { AdminCvTemplateComponent } from './components/admin-cv-template/admin-cv-template.component';
import { ScheduleInterviewComponent } from './components/schedule-interview/schedule-interview.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { NotificationMessagesComponent } from './components/notification-messages/notification-messages.component';
import { MswordTemplateComponent } from '../recruiter/edit-candidate-cv/cv-download-options/msword-template/msword-template.component';
import { JobDetailsViewComponent } from './components/job-details-view/job-details-view.component';
import { ShareJobTemplateComponent } from './components/share-job-template/share-job-template.component';
import { RatingsAndReviewsComponent } from './components/ratings-and-reviews/ratings-and-reviews.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { DownloadJobViewPageComponent } from './components/download-job-view-page/download-job-view-page.component';
import { DownloadJobTemplateComponent } from './components/download-job-view-page/download-job-template/download-job-template.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { CustomOverlayComponent } from './components/custom-overlay/custom-overlay.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PureCssLoaderComponent } from './components/pure-css-loader/pure-css-loader.component';
import { SimpleComponentLoaderComponent } from './components/simple-component-loader/simple-component-loader.component';
import { SimpleComponentLoaderWithSpinnerComponent } from './components/simple-component-loader-with-spinner/simple-component-loader-with-spinner.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HasModuleDirective } from '../directives/has-module.directive';
import { RecruitmentDirective } from '../directives/recruitment.directive';
import { CrmDirective } from '../directives/crm.directive';
import { CandidateDirective } from '../directives/candidate.directive';
import { JobBoardDirective } from '../directives/job-board.directive';
import { CompanyDirective } from '../directives/company.directive';
import { PlacementDirective } from '../directives/placement.directive';
import { ProjectManagementDirective } from '../directives/project-management.directive';
import { FinancialsDirective } from '../directives/financials.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigationDropdownLinkComponent } from './components/navigation-dropdown-link/navigation-dropdown-link.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { CandidateProfileComponent } from '../recruiter/main/views/candidates/candidate-listing/candidate-item/candidate-profile/candidate-profile.component';
import { CandidatePortfolioLinkedinComponent } from '../recruiter/main/views/candidates/candidate-listing/candidate-item/candidate-portfolio-linkedin/candidate-portfolio-linkedin.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomHookLoaderComponent } from './components/custom-hook-loader/custom-hook-loader.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SettingsDirective } from '../directives/settings.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    StringToArrayPipe,
    SkillTitleComponent,
    OrderByPipe,
    PreviewUploadedCvComponent,
    CvViewPageComponent,
    AdminCvTemplateComponent,
    ScheduleInterviewComponent,
    SnackBarComponent,
    NotificationMessagesComponent,
    MswordTemplateComponent,
    JobDetailsViewComponent,
    ShareJobTemplateComponent,
    RatingsAndReviewsComponent,
    DownloadJobTemplateComponent,
    DownloadJobViewPageComponent,
    DateAgoPipe,
    CustomOverlayComponent,
    ToolbarComponent,
    PureCssLoaderComponent,
    SimpleComponentLoaderComponent,
    SimpleComponentLoaderWithSpinnerComponent,
    HasModuleDirective,
    RecruitmentDirective,
    CrmDirective,
    CandidateDirective,
    JobBoardDirective,
    CompanyDirective,
    PlacementDirective,
    ProjectManagementDirective,
    FinancialsDirective,
    SettingsDirective,
    NavigationDropdownLinkComponent,
    CandidateProfileComponent,
    CandidatePortfolioLinkedinComponent,
    SpinnerComponent,
    CustomHookLoaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // EditorModule
    PdfViewerModule,
    NgxPaginationModule,
    Ng2TelInputModule,
    NgxIntlTelInputModule,
    NgxStarRatingModule,
    NgHttpLoaderModule.forRoot(),
    NgSelectModule,
    SharedRoutingModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    MatTooltipModule
  ],
  exports: [
    // EditorModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    StringToArrayPipe,
    SkillTitleComponent,
    OrderByPipe,
    PdfViewerModule,
    NgxPaginationModule,
    AdminCvTemplateComponent,
    Ng2TelInputModule,
    NgxIntlTelInputModule,
    SnackBarComponent,
    NotificationMessagesComponent,
    ShareJobTemplateComponent,
    DownloadJobTemplateComponent,
    DownloadJobViewPageComponent,
    DateAgoPipe,
    CustomOverlayComponent,
    ToolbarComponent,
    PureCssLoaderComponent,
    SimpleComponentLoaderComponent,
    SimpleComponentLoaderWithSpinnerComponent,
    NgHttpLoaderModule,
    HasModuleDirective,
    RecruitmentDirective,
    CrmDirective,
    CandidateDirective,
    JobBoardDirective,
    CompanyDirective,
    PlacementDirective,
    ProjectManagementDirective,
    FinancialsDirective,
    SettingsDirective,
    NgSelectModule,
    NavigationDropdownLinkComponent,
    ToastrModule,
    CandidateProfileComponent,
    CandidatePortfolioLinkedinComponent,
    SpinnerComponent,
    CustomHookLoaderComponent,
    AngularEditorModule,
    MatTooltipModule
  ],
})
export class SharedModule {}
