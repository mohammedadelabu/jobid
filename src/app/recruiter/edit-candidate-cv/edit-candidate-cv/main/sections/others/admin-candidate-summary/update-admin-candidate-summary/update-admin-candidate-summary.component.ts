import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-update-admin-candidate-summary',
  templateUrl: './update-admin-candidate-summary.component.html',
  styleUrls: ['./update-admin-candidate-summary.component.scss'],
})
export class UpdateAdminCandidateSummaryComponent implements OnInit, OnDestroy {
  candidateSummaryForm!: FormGroup;
  responseMessage = '';
  candidateId: any;
  SummaryId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _candidateSummarySvc: CandidateSummaryService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    let subscription = this._candidateSummarySvc
      .getCandidateSummarySubjectItem()
      .subscribe((response: any) => {
        this.handleIsEdit(response);
      });
    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.candidateSummaryForm = this._formBuilder.group({
      Summary: '',
    });
  }

  updateSummary() {
    let subscription = this._candidateSummarySvc
      .updateCandidateSummary(this.candidateSummaryForm.value, this.SummaryId)
      .subscribe((response: any) => {        
        if (response) {
          this._candidateSummarySvc.sendEditBehaviouralMsg(false);
        }
      });
    this.subscriptions.push(subscription);
  }

  handleIsEdit(Summary: any) {
    this.SummaryId = Summary.Id;
    this.candidateSummaryForm.controls['Summary'].setValue(Summary.Summary);
  }
  cancelForm() {
    this._candidateSummarySvc.sendAddBehaviouralMsg(false);
  }

  cancelEdit() {
    this._candidateSummarySvc.sendEditBehaviouralMsg(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
