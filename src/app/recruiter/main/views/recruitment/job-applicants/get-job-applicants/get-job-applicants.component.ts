import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-get-job-applicants',
  templateUrl: './get-job-applicants.component.html',
  styleUrls: ['./get-job-applicants.component.scss'],
})
export class GetJobApplicantsComponent implements OnInit, OnDestroy {
  @Input('vacancyId') vacancyId!: string;
  @Input('companyId') companyId!: string;

  applicantList: any;
  uiList: any;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };

  constructor(private _jobApplicationSvc: JobApplicationService) {}

  ngOnInit(): void {
    // console.log('vacancyId: ', this.vacancyId);
    this.onGetJobApplicants();
  }

  onGetJobApplicants() {
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(this.userQuery)
      )
      .subscribe({
        next: (response: any) => {
          // console.log(' this.onGetJobApplicants(): ', response);
          this.applicantList = response?.Data?.Items;
          this.uiList = response?.Data?.Items?.slice(0, 4);
          // console.log('this.uiList: ', this.uiList);
        },
        error: (err: any) => {},
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
