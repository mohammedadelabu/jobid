import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-candidate-application-list',
  templateUrl: './candidate-application-list.component.html',
  styleUrls: ['./candidate-application-list.component.scss'],
})
export class CandidateApplicationListComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  candidateApplicationList: any;
  subscriptions: Subscription[] = [];
  constructor(private _jobApplicationSvc: JobApplicationService) {}

  ngOnInit(): void {
    this.onGetAllCandidateJobApplications(this.candidateId);
  }

  onGetAllCandidateJobApplications(CandidateId: string) {
    let subscription = this._jobApplicationSvc
      .GetAllJobApplications(CandidateId)
      .subscribe({
        next: (response: any) => {
          if (response.ResponseCode == '00') {
            this.candidateApplicationList = response?.Data;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
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
