import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { HiredListComponent } from './hired-list/hired-list.component';
import { JobApplicantsComponent } from './job-applicants.component';
import { ShortlistedListComponent } from './shortlisted-list/shortlisted-list.component';

const routes: Routes = [
  {
    path: '',
    component: JobApplicantsComponent,
    // children: [
    //   { path: 'applicant-list', component: ApplicantListComponent },
    //   { path: 'hired-list', component: HiredListComponent },
    //   { path: 'shortlisted-list', component: ShortlistedListComponent },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicantsRoutingModule {}
