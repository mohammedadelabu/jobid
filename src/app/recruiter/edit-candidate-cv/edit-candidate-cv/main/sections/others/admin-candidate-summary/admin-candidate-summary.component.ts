import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-admin-candidate-summary',
  templateUrl: './admin-candidate-summary.component.html',
  styleUrls: ['./admin-candidate-summary.component.scss'],
})
export class AdminCandidateSummaryComponent implements OnInit, OnDestroy {
  isEdit!: boolean;
  isAdd!: boolean;
  candidateId: any;
  responseMessage!: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _editCandidateCvSvc: EditCandidateCvService,
    private _candidateSummarySvc: CandidateSummaryService
  ) {}

  ngOnInit(): void {
    let subscription1 = this._candidateSummarySvc
      .getEditBehaviouralMsg()
      .subscribe((response) => {
        if (response) {
          this.isEdit = response;
          // console.log(this.isEdit);
        } else {
          this.isEdit = false;
        }
      });
    this.subscriptions.push(subscription1);
    let subscription2 = this._candidateSummarySvc
      .getAddBehaviouralMsg()
      .subscribe((response) => {
        if (response) {
          this.isAdd = response;
          
        } else {
          this.isAdd = false;
        }
      });
    this.subscriptions.push(subscription2);
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
    this.getCandidateSummary(this.candidateId);
  }

  getCandidateSummary(UserId: any) {
    let subscription = this._candidateSummarySvc
      .getCandidateSummary(UserId)
      .subscribe((response: any) => {
        let candidateSummary = response.Data;
        // this.infoMessage = response.ResponseMessage;
        if (candidateSummary) {
          candidateSummary.forEach((opinion: any) => {
            if (UserId === opinion.UserId) {
              this._candidateSummarySvc.sendAddBehaviouralMsg(false);
              this.responseMessage =
                'A summary has already been created!, You can only update the existing summary';
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
    this._candidateSummarySvc.sendAddBehaviouralMsg(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
