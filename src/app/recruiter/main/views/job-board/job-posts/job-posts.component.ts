import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.scss'],
})
export class JobPostsComponent implements OnInit, OnDestroy {
  jobPosts: any;
  pagedJobPosts: any;
  listCandidateCards!: boolean;
  publishStatus: any;
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  count = 0;
  // itemsPerPage = 12;
  subscriptions: Subscription[] = [];
  jobPostsLoading = false;
  constructor(
    private _jobVacancySvc: JobVacancyService,
    private _router: Router,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    // this.onGetJobVacancies();
    this.onGetPagedJobVacancies();
    this._jobVacancySvc.listCandidateCards.subscribe({
      next: (response: boolean) => {
        this.listCandidateCards = response;
      },
    });
    // let subscription = this._messengerSvc.getSubject().subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       this.onGetJobVacancies();
    //     }
    //   },
    // });
    // this.subscriptions.push(subscription);
  }

  // onItemsPerPage(Count: number) {
  //   this.itemsPerPage = 0;
  //   this.itemsPerPage += Count;
  //   console.log(this.itemsPerPage);
  // }

  toggleCards() {
    console.log('starts!!!');
    this.listCandidateCards = !this.listCandidateCards;
    console.log(this.listCandidateCards);
    console.log('ends!!!');
  }

  // onGetJobVacancies() {
  //   let subscription = this._jobVacancySvc.getJobVacancies().subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.jobPosts = response.Data.filter(
  //           (job: any) => job.Id != environment.internalVacancyId
  //         );
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }

  onGetPagedJobVacancies() {
    this.jobPostsLoading = true;
    let userQuery = { pageSize: this.pageSize, pageNumber: this.page };
    let subscription = this._jobVacancySvc
      .getPagedJobVacancies(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          this.jobPostsLoading = false;
          if (response) {
            this.totalPosts = response.Data.TotalSize;
            this.pagedJobPosts = response.Data.Items;
          }
        },
        error: (err: any) => {
          this.jobPostsLoading = false;
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onDirectToDetailsPage(CompanyId: string, Id: string) {
    console.log('CompanyId** | Id**: ', CompanyId, Id);
    let subscription = this._jobVacancySvc
      .getJobVacanciesByCompany(CompanyId)
      .subscribe({
        next: (response: any) => {
          this._router.navigate([
            `/recruiter/employee-management/job-board/job-details/${CompanyId}/${Id}`,
          ]);
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onPublish(jobId: any, PublishJob: any) {
    console.log('jobId:', jobId);
    PublishJob = !PublishJob;
    this.publishStatus = {
      status: PublishJob,
      id: jobId,
    };
    console.log('publish:', this.publishStatus);
    let subscription = this._jobVacancySvc
      .handlePublishJob(this.publishStatus)
      .subscribe({
        next: (response: any) => {
          if (response) {
            //
            // this.getJobList();
            this._messengerSvc.sendSubject('Job published!');
          }
        },
        error: (err: any) => {},
      });
    this.subscriptions.push(subscription);
  }

  onIsClosed(jobId: any, IsClosed: any) {
    console.log('jobId:', jobId);
    IsClosed = !IsClosed;
    let isClosedStatus = {
      isClosed: IsClosed,
      id: jobId,
    };
    console.log('isClosedStatus:', isClosedStatus);
    let subscription = this._jobVacancySvc
      .handleClosedJob(isClosedStatus)
      .subscribe({
        next: (response: any) => {
          if (response) {
            //
            // this.getJobList();
            this._messengerSvc.sendSubject('Job closed!');
          }
        },
        error: (err: any) => {},
      });
    this.subscriptions.push(subscription);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.onGetPagedJobVacancies();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
