import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';

@Component({
  selector: 'app-update-candidate-summary',
  templateUrl: './update-candidate-summary.component.html',
  styleUrls: ['./update-candidate-summary.component.scss'],
})
export class UpdateCandidateSummaryComponent implements OnInit {
  @Output() closeIsUpdateCandidateSummary = new EventEmitter();

  candidateSummaryForm!: FormGroup;
  responseMessage = '';
  candidateId: any;
  SummaryId: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _candidateSummarySvc: CandidateSummaryService,
    public dialogRef: MatDialogRef<UpdateCandidateSummaryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { candidateSummary: any }
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.handleIsEdit(this.data.candidateSummary);
  }

  buildForm() {
    this.candidateSummaryForm = this._formBuilder.group({
      Summary: '',
    });
  }

  updateSummary() {
    this._candidateSummarySvc
      .updateCandidateSummary(
        this.candidateSummaryForm.value,
        this.data?.candidateSummary?.Id
      )
      .subscribe((response: any) => {
        
        if (response) {
          this.onCloseForm();
        }
      });
  }

  handleIsEdit(Summary: any) {
    this.SummaryId = Summary.Id;
    this.candidateSummaryForm.controls['Summary'].setValue(Summary.Summary);
  }

  onCloseForm() {
    this.closeIsUpdateCandidateSummary.emit(false);
    this.dialogRef.close('close');
    
  }
}
