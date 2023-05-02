import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { UpdateCandidateSummaryComponent } from '../update-candidate-summary/update-candidate-summary.component';

@Component({
  selector: 'app-preview-candidate-summary',
  templateUrl: './preview-candidate-summary.component.html',
  styleUrls: ['./preview-candidate-summary.component.scss'],
})
export class PreviewCandidateSummaryComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  candidateSummary: any;
  infoMessage = 'No summary provided yet!';

  constructor(
    private _candidateSummarySvc: CandidateSummaryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCandidateSummary(this.candidateId);
  }

  getCandidateSummary(id: any) {
    this._candidateSummarySvc.getCandidateSummary(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.candidateSummary = response.Data;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn(err);
        }
      },
    });
    // .subscribe((response: any) => {
    //   this.candidateSummary = response.Data;
    //   this.infoMessage = response.ResponseMessage;
    // });
  }

  updateCandidateSummary(CandidateSummary: any) {
    const dialogRef = this.dialog.open(UpdateCandidateSummaryComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { candidateSummary: CandidateSummary },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // 
      if (result) {
        this.getCandidateSummary(this.candidateId);
      }
    });
  }

  removeSummary(id: any) {
    let confirmation = confirm('Are you sure you want to delete this Summary?');
    if (confirmation) {
      this._candidateSummarySvc
        .deletCandidateSummary(id)
        .subscribe((response: any) => {
          if (response) {
            this.getCandidateSummary(this.candidateId);
          }
        });
    }
  }
}
