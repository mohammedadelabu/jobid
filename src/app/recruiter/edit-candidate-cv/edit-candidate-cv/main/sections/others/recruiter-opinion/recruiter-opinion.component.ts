import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';

@Component({
  selector: 'app-recruiter-opinion',
  templateUrl: './recruiter-opinion.component.html',
  styleUrls: ['./recruiter-opinion.component.scss'],
})
export class RecruiterOpinionComponent implements OnInit, OnDestroy {
  isEdit!: boolean;
  isAdd!: boolean;
  candidateId: any;
  responseMessage!: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _recruiterOpinionSvc: RecruiterOpinionService,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}

  ngOnInit(): void {
    let subscription1 = this._recruiterOpinionSvc
      .getEditBehaviouralMsg()
      .subscribe((response: any) => {
        this.isEdit = response;
        // console.log(this.isEdit);
      });
    this.subscriptions.push(subscription1);

    let subscription2 = this._recruiterOpinionSvc
      .getAddBehaviouralMsg()
      .subscribe((response: any) => {
        this.isAdd = response;
        
      });
    this.subscriptions.push(subscription2);
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
    this.getRecruiterOpinion(this.candidateId);
  }

  getRecruiterOpinion(UserId: any) {
    let subscription = this._recruiterOpinionSvc
      .getRecruiterOpinion(UserId)
      .subscribe((response: any) => {
        // console.log('test data raw: ', response);
        // console.log('test data: ', response.Data);
        let recruiterOpinions = response.Data;
        // this.infoMessage = response.ResponseMessage;
        if (recruiterOpinions) {
          recruiterOpinions.forEach((opinion: any) => {
            // console.log('**opinion: ', opinion);
            // console.log('**UserId: ', UserId);

            if (this.candidateId === UserId) {
              this._recruiterOpinionSvc.sendAddBehaviouralMsg(false);
              console.warn(
                'An opinion has already been created!, You can only update the existing opinion'
              );
              this.responseMessage =
                'An opinion has already been created!, You can only update the existing opinion';
              setTimeout(() => {
                this.responseMessage = '';
              }, 3000);
            }
          });
        }
      });

    this.subscriptions.push(subscription);
  }

  handleIsAdd() {
    this.onGetCandidateId();
    this._recruiterOpinionSvc.sendAddBehaviouralMsg(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
