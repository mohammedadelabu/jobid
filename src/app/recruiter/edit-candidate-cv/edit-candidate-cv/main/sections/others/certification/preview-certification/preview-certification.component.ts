import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-preview-certification',
  templateUrl: './preview-certification.component.html',
  styleUrls: ['./preview-certification.component.scss'],
})
export class PreviewCertificationComponent implements OnInit, OnDestroy {
  certificationList: any;
  infoMessage = 'No certification provided yet!';
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _editCandidateCvSvc: EditCandidateCvService,
    private _certificationSvc: CertificationService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.getData();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
  }

  getData() {
    let subscription = this._certificationSvc
      .getCandidateCertification(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.certificationList = response;
          }
        },
        error: (err) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getCertification(id: any) {
    let subscription = this._certificationSvc
      .getCandidateCertification(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.warn('response---------!!!>: ', response);
            this.certificationList = response;
          }
        },
        error: (err) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  removeCertification(certificationId: any) {
    let confirmDelete = confirm(
      'Are you sure you want to delete this Certification?'
    );
    if (confirmDelete) {
      let subscription = this._certificationSvc
        .removeCertification(certificationId)
        .subscribe({
          next: (response) => {
            if (response) {
              this.getData();
            }
          },
          error: (err) => {
            console.warn('Error: ', err);
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  isEditForm(item: any) {
    this._certificationSvc.sendEditBehaviouralMsg(true);
    setTimeout(() => {
      this._certificationSvc.sendCertificationSubjectItem(item);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
