import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-preview-admin-candidate-summary',
  templateUrl: './preview-admin-candidate-summary.component.html',
  styleUrls: ['./preview-admin-candidate-summary.component.scss'],
})
export class PreviewAdminCandidateSummaryComponent
  implements OnInit, OnDestroy
{
  candidateId: any;
  candidateSummary: any;
  infoMessage = 'No summary provided yet!';
  subscriptions: Subscription[] = [];

  constructor(
    private _candidateSummarySvc: CandidateSummaryService,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
    this.getCandidateSummary(this.candidateId);
  }

  getCandidateSummary(id: any) {
    let subscription = this._candidateSummarySvc
      .getCandidateSummary(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateSummary = response;
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn(err);
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  isEditForm(item: any) {
    this._candidateSummarySvc.sendEditBehaviouralMsg(true);
    setTimeout(() => {
      this._candidateSummarySvc.sendCandidateSummarySubjectItem(item);
    }, 1000);
  }

  removeSummary(id: any) {
    let confirmation = confirm('Are you sure you want to delete this Summary?');
    if (confirmation) {
      let subscription = this._candidateSummarySvc
        .deletCandidateSummary(id)
        .subscribe((response: any) => {
          if (response) {
            this.onGetCandidateId();
          }
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
