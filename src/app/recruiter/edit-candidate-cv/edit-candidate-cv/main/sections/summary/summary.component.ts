import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  CandidateId: any;
  constructor(private _editCandidateCvSvc: EditCandidateCvService,
    private _router: Router) {}

  ngOnInit(): void {
    this.getCandidateId();
  }

  getCandidateId() {
    this.CandidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
  }

  onDownloadCv() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.CandidateId);
    this._router.navigate([
      'recruiter/candidates/cv-preview/',
      this.CandidateId,
    ]);
  }
  
  onGoBack(){
    history.back()
  }
}
