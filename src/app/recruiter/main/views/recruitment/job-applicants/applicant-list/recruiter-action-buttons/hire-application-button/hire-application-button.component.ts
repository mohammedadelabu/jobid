import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-hire-application-button',
  templateUrl: './hire-application-button.component.html',
  styleUrls: ['./hire-application-button.component.scss'],
})
export class HireApplicationButtonComponent implements OnInit, OnDestroy {
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

  onHireApplication() {
    // console.log('Shortlist: ', application);
    const Payload = {
      status: 'Hired',
      applicationID: this.application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    console.log('Update Hired: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'Application hired!'
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
