import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGuard } from 'src/app/services/guards/company/company.guard';
import { AddCompanyContactComponent } from '../company/add-company-contact/add-company-contact.component';
import { AddCompanyComponent } from '../company/add-company/add-company.component';
import { CompanyAttachedDocumentsComponent } from '../company/company-attached-documents/company-attached-documents.component';
import { CompanyDetailsComponent } from '../company/company-details/company-details.component';
import { CompanyListComponent } from '../company/company-list/company-list.component';
import { CompanyMessengerComponent } from '../company/company-messenger/company-messenger.component';
import { CompanyComponent } from '../company/company.component';
import { EditCompanyComponent } from '../company/edit-company/edit-company.component';
import { ContactListComponent } from './contacts/contact-list.component';
import { CrmComponent } from './crm.component';
import { DealsAltComponent } from './deals-alt/deals-alt.component';
import { ConvertLeadToDealComponent } from './deals/convert-lead-to-deal/convert-lead-to-deal.component';
import { ExistingCompanyConversionComponent } from './deals/convert-lead-to-deal/existing-company-conversion/existing-company-conversion.component';
import { NewCompanyConversionComponent } from './deals/convert-lead-to-deal/new-company-conversion/new-company-conversion.component';
import { SelectCompanyComponent } from './deals/convert-lead-to-deal/select-company/select-company.component';
import { CreateJobFromDealComponent } from './deals/create-job-from-deal/create-job-from-deal.component';
import { ActivityComponent } from './deals/deal-details/activity/activity.component';
import { DealDetailsComponent } from './deals/deal-details/deal-details.component';
import { DetailsComponent } from './deals/deal-details/details/details.component';
import { DealsComponent } from './deals/deals.component';
// import { ConvertLeadToDealComponent } from './leads/convert-lead-to-deal/convert-lead-to-deal.component';
import { CreateLeadComponent } from './leads/create-lead/create-lead.component';
import { EditLeadComponent } from './leads/edit-lead/edit-lead.component';
import { LeadsComponent } from './leads/leads.component';
import { NotificationComponent } from './notification/notification.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '',
    component: CrmComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'leads' },
      { path: 'leads', component: LeadsComponent },
      { path: 'leads/create-lead', component: CreateLeadComponent },
      { path: 'edit-lead/:leadId', component: EditLeadComponent },
      { path: 'deals', component: DealsComponent },
      {
        path: 'deals/:dealId',
        component: DealDetailsComponent,
        children: [
          {
            path: '',
            component: DetailsComponent,
            pathMatch: 'full',
            redirectTo: 'details',
          },
          { path: 'details', component: DetailsComponent },
          { path: 'activity', component: ActivityComponent },
        ],
      },
      { path: 'createJob/deal/:dealId', component: CreateJobFromDealComponent },
      { path: 'deals-alt', component: DealsAltComponent },
      // { path: 'leads/convert-lead-to-deal/:leadId', component: ConvertLeadToDealComponent },
      {
        path: 'leads/convert-lead-to-deal/:leadId',
        component: SelectCompanyComponent,
      },
      {
        path: 'leads/convert-lead-to-deal/new-company/:leadId',
        component: NewCompanyConversionComponent,
      },
      {
        path: 'leads/convert-lead-to-deal/company/:leadId/:companyId',
        component: ExistingCompanyConversionComponent,
      },
      { path: 'contacts', component: ContactListComponent },
      { path: 'task', component: TaskComponent },
      { path: 'notification', component: NotificationComponent },
      {
        path: 'companies',
        component: CompanyComponent,
        // canActivateChild: [CompanyGuard],
        children: [
          // { path: 'add-company', component: AddCompanyComponent},
          // { path: '', component: AddCompanyComponent},
          // { path: 'company-list', component: CompanyListComponent},

          // { path: '', component: AddCompanyComponent},
          { path: '', component: CompanyListComponent },
          { path: 'add-company', component: AddCompanyComponent },
          { path: 'add-contact', component: AddCompanyContactComponent },
          { path: 'edit-contact/:companyId', component: EditCompanyComponent },
          {
            path: 'company-details/:companyId',
            component: CompanyDetailsComponent,
          },
          {
            path: 'messenger/:companyId',
            component: CompanyMessengerComponent,
          },
          {
            path: 'attached-documents/:companyId',
            component: CompanyAttachedDocumentsComponent,
          },
        ],
      },
      // { path: 'timesheet', component: TimesheetComponent },
      // { path: 'project', component: ProjectComponent },
      // { path: 'todo', component: TodoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
