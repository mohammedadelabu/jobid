import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-add-admin-candidate-summary',
  templateUrl: './add-admin-candidate-summary.component.html',
  styleUrls: ['./add-admin-candidate-summary.component.scss'],
})
export class AddAdminCandidateSummaryComponent implements OnInit, OnDestroy {
  candidateSummaryForm!: FormGroup;
  responseMessage = '';
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _candidateSumarySvc: CandidateSummaryService // private _authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetCandidateId();
  }

  buildForm() {
    this.candidateSummaryForm = this._formBuilder.group({
      Summary: '',
    });
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  saveOpinion() {
    // console.log("candidateSummaryForm: ", this.candidateSummaryForm.value);

    this.onGetCandidateId();
    if (this.candidateId) {
      // 
      let subscription = this._candidateSumarySvc
        .addCandidateSummary(this.candidateSummaryForm.value, this.candidateId)
        .subscribe((response: any) => {
          
          this._candidateSumarySvc.sendAddBehaviouralMsg(false);
        });
      this.subscriptions.push(subscription);
    }
  }

  cancelForm() {
    // console.log("close")
    this._candidateSumarySvc.sendAddBehaviouralMsg(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
