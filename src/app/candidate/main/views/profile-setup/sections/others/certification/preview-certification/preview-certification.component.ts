import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CertificationService } from 'src/app/services/certification.service';
import { UpdateCertificationComponent } from '../update-certification/update-certification.component';

@Component({
  selector: 'app-preview-certification',
  templateUrl: './preview-certification.component.html',
  styleUrls: ['./preview-certification.component.scss'],
})
export class PreviewCertificationComponent implements OnInit {
  @Input('candidateId') candidateId!: string;

  certificationList: any;
  infoMessage = 'No certification provided yet!';
  constructor(
    private _certificationSvc: CertificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCandidateCertificationList(this.candidateId);
  }

  getCandidateCertificationList(CandidateId: string) {
    this._certificationSvc.getCandidateCertification(CandidateId).subscribe({
      next: (response: any) => {
        if (response) {

          this.certificationList = response.Data;
        }
      },
      error: (err) => {
        console.warn('Error: ', err);
      },
    });
  }
  getCertification(id: any) {
    this._certificationSvc.getCandidateCertification(id).subscribe({
      next: (response: any) => {
        if (response) {
          // console.log('test data: ', response);
          this.certificationList = response.Data;
        }
      },
      error: (err) => {
        console.warn('Error: ', err);
      },
    });
  }

  removeCertification(certificationId: any) {
    // console.log(certificationId);

    let confirmDelete = confirm(
      'Are you sure you want to delete this Certification?'
    );
    if (confirmDelete) {
      this._certificationSvc.removeCertification(certificationId).subscribe({
        next: (response) => {
          if (response) {
            this.getCandidateCertificationList(this.candidateId);
          }
        },
        error: (err) => {
          console.warn('Error: ', err);
        },
      });
    }
  }

  updateExperience(Certification: any) {
    const dialogRef = this.dialog.open(UpdateCertificationComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { certification: Certification },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCandidateCertificationList(this.candidateId);
      }
    });
  }
}
