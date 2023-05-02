import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadJobViewPageComponent } from 'src/app/shared/components/download-job-view-page/download-job-view-page.component';
import { JobBoardComponent } from './job-board.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { DisclosedComponent } from './job-details/job-download-options/disclosed/disclosed.component';
import { JobDownloadOptionsComponent } from './job-details/job-download-options/job-download-options.component';
import { JobListsComponent } from './job-lists/job-lists.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { PendingPostsComponent } from './pending-posts/pending-posts.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ShareDisclosedJobComponent } from './share-job/share-disclosed-job/share-disclosed-job.component';
import { ShareJobComponent } from './share-job/share-job.component';
import { ShareUndisclosedJobComponent } from './share-job/share-undisclosed-job/share-undisclosed-job.component';

const routes: Routes = [
  {
    path: '',
    component: JobBoardComponent,
    children: [
      {
        path: '',
        component: JobListsComponent,
        children: [
          { path: '', component: JobPostsComponent },
          { path: 'pending-posts', component: PendingPostsComponent },
        ],
      },
      { path: 'job-details/:companyId/:jobId', component: JobDetailsComponent },
      { path: 'post-job', component: PostJobComponent },
      { path: 'share-job/:companyId/:jobId', component: ShareJobComponent },
      // { path: 'download-job/:companyId/:jobId', component: DownloadJobViewPageComponent },
      {
        path: 'download-job/:companyId/:jobId',
        component: JobDownloadOptionsComponent,
      },
      // { path: 'disclosed-job/:companyId/:jobId', component: ShareDisclosedJobComponent },
      // { path: 'undisclosed-job/:companyId/:jobId', component: ShareUndisclosedJobComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobBoardRoutingModule {}
