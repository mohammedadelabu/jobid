import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminComponent } from './authentication/main/views/register-admin/register-admin.component';
import { EditCandidateCvComponent } from './recruiter/edit-candidate-cv/edit-candidate-cv/edit-candidate-cv.component';
import { DisclosedComponent } from './recruiter/main/views/job-board/job-details/job-download-options/disclosed/disclosed.component';
import { UndisclosedComponent } from './recruiter/main/views/job-board/job-details/job-download-options/undisclosed/undisclosed.component';
import { ShareDisclosedJobComponent } from './recruiter/main/views/job-board/share-job/share-disclosed-job/share-disclosed-job.component';
import { ShareUndisclosedJobComponent } from './recruiter/main/views/job-board/share-job/share-undisclosed-job/share-undisclosed-job.component';
import { AccountSettingsComponent } from './recruiter/main/views/settings/account-settings/account-settings.component';
import { AdminUserGuard } from './services/guards/admin-user.guard';
import { AuthGuard } from './services/guards/auth.guard';
import { CvViewPageComponent } from './shared/components/cv-view-page/cv-view-page.component';
import { DownloadJobViewPageComponent } from './shared/components/download-job-view-page/download-job-view-page.component';
import { JobDetailsViewComponent } from './shared/components/job-details-view/job-details-view.component';
import { PageNotFoundComponent } from './shared/views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recruiter/dashboard' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'register-admin', component: RegisterAdminComponent },
  {
    path: 'company-onboarding',
    loadChildren: () =>
      import('./company-onboarding/company-onboarding.module').then(
        (m) => m.CompanyOnboardingModule
      ),
  },
  {
    path: 'recruiter',
    canActivate: [AuthGuard, AdminUserGuard],
    loadChildren: () =>
      import('./recruiter/recruiter.module').then((m) => m.RecruiterModule),
  },
  {
    path: 'edit-candidate-cv',
    canActivate: [AuthGuard, AdminUserGuard],
    loadChildren: () =>
      import('./recruiter/edit-candidate-cv/edit-candidate-cv.module').then(
        (m) => m.EditCandidateCvModule
      ),
  },
  {
    path: 'view-cv',
    component: CvViewPageComponent,
    canActivate: [AuthGuard, AdminUserGuard],
  },
  {
    path: 'view-job-download',
    component: DownloadJobViewPageComponent,
    canActivate: [AuthGuard, AdminUserGuard],
  },
  {
    path: 'disclosed-job/:companyId/:jobId',
    component: ShareDisclosedJobComponent,
  },
  {
    path: 'undisclosed-job/:companyId/:jobId',
    component: ShareUndisclosedJobComponent,
  },
  // {
  //   path: 'view-job-details',
  //   component: JobDetailsViewComponent,
  // },
  {
    path: 'practice',
    loadChildren: () =>
      import('./practice/module/practice.module').then((m) => m.PracticeModule),
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./verification/verification.module').then(
        (m) => m.VerificationModule
      ),
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('./candidate/candidate.module').then((m) => m.CandidateModule),
  },
  {
    path: 'recruiter/settings/account-settings',
    component: AccountSettingsComponent,
  },

  { path: 'download/disclosed-job', component: DisclosedComponent },
  { path: 'download/undisclosed-job', component: UndisclosedComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
