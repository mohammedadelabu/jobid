import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss'],
})
export class JobApplicantsComponent implements OnInit, OnDestroy {
  @Input('JobId') JobId: any;
  JobApplicants: any;
  noFound!: string;
  uiList: any;
  subscriptions: Subscription[] = [];
  constructor(private _jobApplicationSvc: JobApplicationService) {}

  ngOnInit(): void {
    console.log('JobApplicantsComponent => JobId: ', this.JobId);
    // this.getJobApplicants();
  }

  // getJobApplicants() {
  //   let subscription = this._jobApplicationSvc
  //     .GetAllJobApplicationsForVacancy(this.JobId)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response.ResponseCode == '00') {
  //           console.log('Job Applicants: ', response);
  //           this.JobApplicants = response.Data;
  //           this.uiList = response?.Data?.slice(0, 4);
  //           console.log('this.uiList: ', this.uiList);
  //         }
  //         if (response.ResponseCode == '404') {
  //           this.noFound = 'No Applicant';
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
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
