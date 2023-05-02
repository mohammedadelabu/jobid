import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.scss'],
})
export class ApplyForJobComponent implements OnInit, OnDestroy {
  ApplicationForm!: FormGroup;
  responseMessage: any;
  responseError: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: { JobId: string },
    private _jobApplicationSvc: JobApplicationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.ApplicationForm = this._fb.group({
      Email: ['', Validators.required],
    });
  }

  getCandidateInformation(CandidateEmail: string) {
    let subscription = this._identitySvc
      .getUserByEmail(CandidateEmail)
      .subscribe({
        next: (response: any) => {
          // 
          const Payload = {
            VacancyId: this.data.JobId,
            CandidateId: response.Id,
          };
          
          this.applyForJob(Payload);
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          if (err.status == '400') {
            this.responseError = err.error;
            setTimeout(() => {
              this.responseError = '';
            }, 5000);
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    if (this.ApplicationForm.valid) {
      console.log('this.ApplicationForm: ', this.ApplicationForm.value);
      this.getCandidateInformation(this.ApplicationForm.value.Email);
    }
  }

  applyForJob(Payload: any) {
    let subscription = this._jobApplicationSvc
      .postApplication(Payload)
      .subscribe({
        next: (response: any) => {
          // 
          if (response) {
            this.responseMessage = response.Msg;
            this._jobApplicationSvc.sendJobApplicationSubject(
              'Application added'
            );
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          if (err.status == '400') {
            this.responseError = err.error;
            setTimeout(() => {
              this.responseError = '';
            }, 5000);
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('JOB_SKILLS');
    localStorage.removeItem('Interview_Processes');
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
