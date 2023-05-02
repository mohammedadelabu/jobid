import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadsComponent } from './leads/leads.component';
import { CreateLeadComponent } from './leads/create-lead/create-lead.component';
import { UpdateLeadComponent } from './leads/update-lead/update-lead.component';
import { DealsComponent } from './deals/deals.component';
import { DealsAltComponent } from './deals-alt/deals-alt.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
// import { ConvertLeadToDealComponent } from './leads/convert-lead-to-deal/convert-lead-to-deal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DealDetailsComponent } from './deals/deal-details/deal-details.component';
import { UpdateDealComponent } from './deals/update-deal/update-deal.component';
import { UpdateDealContactComponent } from './deals/update-deal-contact/update-deal-contact.component';
import { AddDealContactComponent } from './deals/add-deal-contact/add-deal-contact.component';
import { CreateJobFromDealComponent } from './deals/create-job-from-deal/create-job-from-deal.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ContactListComponent } from './contacts/contact-list.component';
import { MailingFormComponent } from './contacts/mailing-form/mailing-form.component';
import { ConvertLeadToDealComponent } from './deals/convert-lead-to-deal/convert-lead-to-deal.component';
import { DetailsComponent } from './deals/deal-details/details/details.component';
import { EmailsComponent } from './deals/deal-details/emails/emails.component';
import { NotesComponent } from './deals/deal-details/notes/notes.component';
import { UpdateDealPrimaryContactComponent } from './deals/update-deal-primary-contact/update-deal-primary-contact.component';
import { UpdateDealCompanyComponent } from './deals/update-deal-company/update-deal-company.component';
import { ActivityComponent } from './deals/deal-details/activity/activity.component';
import { ImportLeadFormDialogComponent } from './leads/import-lead-form-dialog/import-lead-form-dialog.component';
import { SendLeadEmailMessageFormDialogComponent } from './leads/send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';
import { ActivityEmailCardComponent } from './components/activity-email-card/activity-email-card.component';
import { ActivityTaskCardComponent } from './components/activity-task-card/activity-task-card.component';
import { ActivitySimpleMessageCardComponent } from './components/activity-simple-message-card/activity-simple-message-card.component';
import { LeadListTableComponent } from './leads/lead-list-table/lead-list-table.component';
import { ContactListTableComponent } from './contacts/contact-list-table/contact-list-table.component';
import { EditLeadComponent } from './leads/edit-lead/edit-lead.component';
import { CompanyInformationFormComponent } from './deals/convert-lead-to-deal/company-information-form/company-information-form.component';
import { ContactInformationFormComponent } from './deals/convert-lead-to-deal/contact-information-form/contact-information-form.component';
import { SelectCompanyComponent } from './deals/convert-lead-to-deal/select-company/select-company.component';
import { PageTitleComponent } from './deals/convert-lead-to-deal/page-title/page-title.component';
import { NewCompanyConversionComponent } from './deals/convert-lead-to-deal/new-company-conversion/new-company-conversion.component';
import { ExistingCompanyConversionComponent } from './deals/convert-lead-to-deal/existing-company-conversion/existing-company-conversion.component';
import { TaskComponent } from './task/task.component';
import { NotificationComponent } from './notification/notification.component';
import { SendDealEmailMessageFormDialogComponent } from './deals/send-deal-email-message-form-dialog/send-deal-email-message-form-dialog.component';
import { TransferDealFormDialogComponent } from './deals/transfer-deal-form-dialog/transfer-deal-form-dialog.component';
import { DealJobPostComponent } from './deals/deal-details/details/deals-job-vacancies/deal-job-post/deal-job-post.component';
import { DealJobShortlistedCandidatesComponent } from './deals/deal-details/deal-job-shortlisted-candidates/deal-job-shortlisted-candidates.component';
import { ShortlistedCandidateComponent } from './deals/deal-details/deal-job-shortlisted-candidates/shortlisted-candidate/shortlisted-candidate.component';
import { CreateNewTagComponent } from './leads/create-lead/create-new-tag/create-new-tag.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';


@NgModule({
  declarations: [
    LeadsComponent,
    CreateLeadComponent,
    UpdateLeadComponent,
    DealsComponent,
    DealsAltComponent,
    ConvertLeadToDealComponent,
    DealDetailsComponent,
    UpdateDealComponent,
    UpdateDealContactComponent,
    AddDealContactComponent,
    CreateJobFromDealComponent,
    ContactListComponent,
    MailingFormComponent,
    DetailsComponent,
    EmailsComponent,
    NotesComponent,
    UpdateDealPrimaryContactComponent,
    UpdateDealCompanyComponent,
    ActivityComponent,
    ImportLeadFormDialogComponent,
    SendLeadEmailMessageFormDialogComponent,
    ActivityEmailCardComponent,
    ActivityTaskCardComponent,
    ActivitySimpleMessageCardComponent,
    LeadListTableComponent,
    ContactListTableComponent,
    EditLeadComponent,
    CompanyInformationFormComponent,
    ContactInformationFormComponent,
    SelectCompanyComponent,
    PageTitleComponent,
    NewCompanyConversionComponent,
    ExistingCompanyConversionComponent,
    TaskComponent,
    NotificationComponent,
    SendDealEmailMessageFormDialogComponent,
    TransferDealFormDialogComponent,
    DealJobPostComponent,
    DealJobShortlistedCandidatesComponent,
    ShortlistedCandidateComponent,
    CreateNewTagComponent,
    CreateTaskComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgMaterialModule,
    SharedModule,
    EditorModule
  ],
})
export class CrmModule {}
