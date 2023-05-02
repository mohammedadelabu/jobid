import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-delete-application-button',
  templateUrl: './delete-application-button.component.html',
  styleUrls: ['./delete-application-button.component.scss'],
})
export class DeleteApplicationButtonComponent implements OnInit, OnDestroy {
  @Input('application') application: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _jobApplicationSvc: JobApplicationService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {}
  onDeleteApplication() {
    console.log('application: ', this.application);
    let confirmDelete = confirm(
      'Are you sure you want to delete this application?'
    );
    if (confirmDelete) {
      let subscription = this._jobApplicationSvc
        .RemoveJobApplication(this.application.Id)
        .subscribe({
          next: (response: any) => {
            
            if (response) {
              this._jobApplicationSvc.sendJobApplicationSubject(
                'Application deleted!'
              );

              this._messengerSvc.sendSubject('Application deleted!');
            }
          },
          error: (err: any) => {
            console.warn(err);
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
