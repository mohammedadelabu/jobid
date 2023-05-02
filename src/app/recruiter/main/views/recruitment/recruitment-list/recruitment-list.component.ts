import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { Statuses } from 'src/app/models/types/statuses';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { UpdateRecruitionStatusComponent } from './update-recruition-status/update-recruition-status.component';

@Component({
  selector: 'app-recruitment-list',
  templateUrl: './recruitment-list.component.html',
  styleUrls: ['./recruitment-list.component.scss'],
})
export class RecruitmentListComponent implements OnInit, OnDestroy {
  jobVacancyList: any;
  closedJobs: any;
  onGoingJobs: any;
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  pagedJobPosts: any;
  subscriptions: Subscription[] = [];
  StatusList = Statuses;
  dateFrom!: string | undefined;
  dateTo!: string | undefined;
  Update = PermissionName.Update;
  View = PermissionName.View;
  Delete = PermissionName.Delete;
  Create = PermissionName.Create;
  isLoading = false;

  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };

  statuses = [
    this.StatusList.Ongoing,
    this.StatusList.New,
    this.StatusList.Rejected,
    this.StatusList.OnHold,
    this.StatusList.Closed,
    this.StatusList.Rollover,
    this.StatusList.ProfileSubmittedAwaitingFeedback,
  ];

  statusMapping: {
    [key: string]: string;
  } = {
    Ongoing: this.StatusList.Ongoing,
    New: this.StatusList.New,
    Rejected: this.StatusList.Rejected,
    OnHold: this.StatusList.OnHold,
    Closed: this.StatusList.Closed,
    Rollover: this.StatusList.Rollover,
    ProfileSubmittedAwaitingFeedBack:
      this.StatusList.ProfileSubmittedAwaitingFeedback,
  };

  constructor(
    private _vacancySvc: JobVacancyService,
    private _messengerSvc: MessengerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Date from:', this.dateFrom);
    console.log('Date to:', this.dateTo);
    this.onGetPagedJobVacancies();
    // let subscription = this._messengerSvc.messengerSubject.subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //
    //       this.onGetPagedJobVacancies();
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
    // this.subscriptions.push(subscription);
  }

  // onGetJobVacancy() {
  //   let subscription = this._vacancySvc.getJobVacancies().subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.jobVacancyList = response.Data;
  //         console.log('this.jobVacancyList: ', this.jobVacancyList);
  //         this.onGoingJobList(this.jobVacancyList);
  //         this.closedJobList(this.jobVacancyList);
  //       }
  //
  //     },
  //     error: (err: any) => {
  //
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }
  onChange($event: any) {
    // console.log('onSubmitSearchByDateRangeForm: ', this.range.value);
    console.log('$event: ', $event.value);
    const x = $event.value;
  }

  onGetPagedJobVacancies() {
    this.isLoading = true;
    let subscription = this._vacancySvc
      .getPagedJobVacancies(buildQueryParams(this.userQuery))
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.totalPosts = response.Data.TotalSize;
            this.jobVacancyList = response.Data.Items.map((job: any) => {
              job.Status = this.statusMapping[job.Status];
              return job;
            });
            // this.onGoingJobList(this.jobVacancyList);
            // this.closedJobList(this.jobVacancyList);
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.isLoading = false;
        },
      });
    this.subscriptions.push(subscription);
  }

  // onGoingJobList(Jobs: any) {
  //   this.onGoingJobs = Jobs.filter((job: any) => job.IsClosed === false);
  //   console.log('this.onGoingJobs: ', this.onGoingJobs);
  //   return this.onGoingJobs;
  // }

  // closedJobList(Jobs: any) {
  //   this.closedJobs = Jobs.filter((job: any) => job.IsClosed != false);
  //   console.log('this.closedJobs: ', this.closedJobs);
  //   return this.closedJobs;
  // }

  pageChangeEvent(event: number) {
    this.page = event;
    this.userQuery = {
      ...this.userQuery,
      PageNumber: event,
    };
    this.onGetPagedJobVacancies();
  }

  onStatusChange(e: Event, jobId: string) {
    const status = getKeyByValue(
      this.statusMapping,
      (<HTMLSelectElement>e.target).value
    ) as validStatus;

    const job = this.jobVacancyList.find((j: any) => j.Id === jobId);
    job.Status = (<HTMLSelectElement>e.target).value;

    let subscription = this._vacancySvc
      .updateJobVacancyStatus(jobId, status)
      .subscribe({
        next: (response: any) => {
          if (response) {
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onDateChange() {
    if (this.dateFrom && this.dateTo) {
      this.userQuery = {
        PageSize: this.pageSize,
        PageNumber: this.page,
        StartDate: new Date(this.dateFrom).toISOString(),
        EndDate: new Date(this.dateTo).toISOString(),
      };
      this.onGetPagedJobVacancies();
    }
  }

  filterByMostRecent() {
    this.resetDateFilters();
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
      Recent: true,
    };
    this.onGetPagedJobVacancies();
  }

  filterByOldest() {
    this.resetDateFilters();
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
      Oldest: true,
    };
    this.onGetPagedJobVacancies();
  }

  filterByAlphabeticalOrder() {
    this.resetDateFilters();
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
      AlphabeticalOrder: true,
    };
    this.onGetPagedJobVacancies();
  }

  filterByStatus(status: validStatus) {
    this.resetDateFilters();
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
      Status: status,
    };
    this.onGetPagedJobVacancies();
  }

  resetDateFilters() {
    this.dateFrom = undefined;
    this.dateTo = undefined;
  }

  clearFilters() {
    this.page = 1;
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
    };
    this.resetDateFilters();
    this.onGetPagedJobVacancies();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}

type validStatus =
  | 'Ongoing'
  | 'New'
  | 'Rejected'
  | 'OnHold'
  | 'Closed'
  | 'Rollover'
  | 'ProfileSubmittedAwaitingFeedBack';

function getKeyByValue(
  object: {
    [key: string]: string;
  },
  value: string
) {
  return Object.keys(object).find((key) => object[key] === value);
}
