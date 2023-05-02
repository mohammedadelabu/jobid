import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';

@Component({
  selector: 'app-preview-recruiter-opinion',
  templateUrl: './preview-recruiter-opinion.component.html',
  styleUrls: ['./preview-recruiter-opinion.component.scss'],
})
export class PreviewRecruiterOpinionComponent implements OnInit, OnDestroy {
  candidateId: any;
  recruiterOpinion: any;
  infoMessage = 'No opinion provided yet!';
  subscriptions: Subscription[] = [];
  constructor(
    private _recruiterOpinionSvc: RecruiterOpinionService,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
    this.getRecruiterOpinion(this.candidateId);
  }

  getRecruiterOpinion(id: any) {
    let subscription = this._recruiterOpinionSvc
      .getRecruiterOpinion(id)
      .subscribe({
        next: (response: any) => {
          console.warn('response--------->: ', response);
          this.recruiterOpinion = response;
          this.infoMessage = response.ResponseMessage;
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  isEditForm(item: any) {
    this._recruiterOpinionSvc.sendEditBehaviouralMsg(true);
    setTimeout(() => {
      this._recruiterOpinionSvc.sendRecruiterOpinionSubjectItem(item);
    }, 1000);
  }

  removeOpinion(id: any) {
    let confirmation = confirm('Are you sure you want to delete this Opinion?');
    if (confirmation) {
      let subscription = this._recruiterOpinionSvc
        .deletRecruiterOpinion(id)
        .subscribe({
          next: (response: any) => {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
