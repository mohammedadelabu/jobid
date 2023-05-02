import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';

@Component({
  selector: 'app-add-candidate-summary',
  templateUrl: './add-candidate-summary.component.html',
  styleUrls: ['./add-candidate-summary.component.scss'],
})
export class AddCandidateSummaryComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddCandidateSummary = new EventEmitter();
  candidateSummaryForm!: FormGroup;
  responseMessage = '';
  constructor(
    private _formBuilder: FormBuilder,
    private _candidateSumarySvc: CandidateSummaryService // private _authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.candidateSummaryForm = this._formBuilder.group({
      Summary: '',
    });
  }

  saveOpinion() {
    if (this.candidateId) {
      this._candidateSumarySvc
        .addCandidateSummary(this.candidateSummaryForm.value, this.candidateId)
        .subscribe((response: any) => {
          
          this.onCloseForm();
        });
    }
  }

  onCloseForm() {
    this.closeIsAddCandidateSummary.emit(false);
    
  }
}
