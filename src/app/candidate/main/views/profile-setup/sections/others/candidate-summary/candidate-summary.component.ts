import { Component, OnInit } from '@angular/core';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-candidate-summary',
  templateUrl: './candidate-summary.component.html',
  styleUrls: ['./candidate-summary.component.scss'],
})
export class CandidateSummaryComponent implements OnInit {
  isAddCandidateSummary!: boolean;
  isUpdateCandidateSummary!: boolean;
  candidateId!: string;
  responseMessage!: string;
  isCandidateSummaryExist!: boolean;
  constructor(
    private _indentitySvc: IdentityService,
    private _candidateSummarySvc: CandidateSummaryService
  ) {}
  ngOnInit(): void {
    this.onGetLoggedInUserId();
  }

  onCheckIfCandidateSummaryExist() {
    this.getCandidateSummary(this.candidateId);
  }

  onCloseIsAddCandidateSummary() {
    this.isAddCandidateSummary = false;
  }

  onCloseIsUpdateCandidateSummary() {
    this.isUpdateCandidateSummary = false;
  }

  onGetLoggedInUserId() {
    this.candidateId = this._indentitySvc.getLoggedInUserId();
  }

  getCandidateSummary(UserId: any) {
    this._candidateSummarySvc
      .getCandidateSummary(UserId)
      .subscribe((response: any) => {
        if (response.ResponseCode == '404') {
          this.isAddCandidateSummary = true;
        }
        let candidateSummary = response.Data;
        // this.infoMessage = response.ResponseMessage;
        if (candidateSummary) {
          candidateSummary.forEach((opinion: any) => {
            if (UserId === opinion.UserId) {
              this.isCandidateSummaryExist = true;
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
  }

  goBack() {
    history.back();
  }
}
