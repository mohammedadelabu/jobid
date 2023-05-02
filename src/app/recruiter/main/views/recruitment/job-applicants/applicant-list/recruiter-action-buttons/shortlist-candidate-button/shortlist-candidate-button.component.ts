import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-shortlist-candidate-button',
  templateUrl: './shortlist-candidate-button.component.html',
  styleUrls: ['./shortlist-candidate-button.component.scss'],
})
export class ShortlistCandidateButtonComponent implements OnInit, OnDestroy {
  @Input('application') application: any;
  updatedBy: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _identitySvc: IdentityService,
    private _jobApplicationSvc: JobApplicationService,
    private _jobApplicationStageSvc: JobApplicationStageService
  ) {}

  ngOnInit(): void {}

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onShortlistApplication() {
    // console.log('Shortlist: ', application);
    const Payload = {
      status: 'Shortlisted',
      applicationID: this.application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            console.log('response: ', response);
            this.application.Status = 'Shortlisted';
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'Interview scheduled!'
            );
          }
        },
        error: (err: any) => {
          
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
