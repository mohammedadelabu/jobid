import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-create-score',
  templateUrl: './create-score.component.html',
  styleUrls: ['./create-score.component.scss'],
})
export class CreateScoreComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isLoading = false;
  application: any;
  userQuery: QueryParamsModel = {
    Status: 'Shortlisted',
  };

  constructor(
    private _route: ActivatedRoute,
    private _jobApplicationSvc: JobApplicationService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe({
      next: (params) => {
        const applicantId: any = params.get('applicantId');
        const vacancyId: any = params.get('vacancyId');
        this.getApplication(vacancyId, applicantId);
      },
    });
  }

  getApplication(vacancyId: string, candidateId: string) {
    this.isLoading = true;
    let subscription = this._jobApplicationSvc
      .GetJobApplicationsForVacancyByCandidateId(vacancyId, candidateId)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.application = response?.Data;
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  // getShortlistedApplicants(vacancyId: string, applicantId: string) {
  //   this.isLoading = true;
  //   let subscription = this._jobApplicationSvc
  //     .GetAllJobApplicationsForVacancy(
  //       vacancyId,
  //       buildQueryParams(this.userQuery)
  //     )
  //     .subscribe({
  //       next: (response: any) => {
  //         this.isLoading = false;
  //         if (response) {
  //           this.application = response?.Data?.Items.filter(
  //             (applicant: any) => !!applicant.Candidate
  //           ).filter(
  //             (applicant: any) => applicant.CandidateId === applicantId
  //           )[0];
  //         }
  //       },
  //       error: (err: any) => {
  //         this.isLoading = false;
  //         console.log('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
