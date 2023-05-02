import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-preview-work-experience',
  templateUrl: './preview-work-experience.component.html',
  styleUrls: ['./preview-work-experience.component.scss'],
})
export class PreviewWorkExperienceComponent implements OnInit, OnDestroy {
  candidateId: any;
  workHistoryList: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _editCandidateCvSvc: EditCandidateCvService,
    private _experienceSvc: ExperienceService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
    this.getWorkHistory(this.candidateId);
  }

  getWorkHistory(id: any) {
    let subscription = this._experienceSvc
      .getCandidateWorkHistory(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.workHistoryList = response;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  removeExperience(experienceId: any) {
    // console.log(experienceId);

    let confirmDelete = confirm(
      'Are you sure you want to delete this work experience?'
    );
    if (confirmDelete) {
      let subscription = this._experienceSvc
        .removeWorkExperience(experienceId)
        .subscribe({
          next: (response: any) => {
            // console.log('deleted: ', response);
            if (response) {
              this.onGetCandidateId();
            }
          },
          error: (err: any) => {
            console.warn('Error: ', err);
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  onGoBack() {
    history.back();
  }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
