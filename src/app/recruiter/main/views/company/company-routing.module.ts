import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyContactComponent } from './add-company-contact/add-company-contact.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyAttachedDocumentsComponent } from './company-attached-documents/company-attached-documents.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyMessengerComponent } from './company-messenger/company-messenger.component';
import { CompanyComponent } from './company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      // { path: 'add-company', component: AddCompanyComponent},
      // { path: '', component: AddCompanyComponent},
      // { path: 'company-list', component: CompanyListComponent},

      // { path: '', component: AddCompanyComponent},
      { path: '', component: CompanyListComponent},
      { path: 'add-company', component: AddCompanyComponent},
      { path: 'add-contact', component: AddCompanyContactComponent},
      { path: 'edit-contact/:companyId', component: EditCompanyComponent},
      { path: 'company-details/:companyId', component: CompanyDetailsComponent},
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
