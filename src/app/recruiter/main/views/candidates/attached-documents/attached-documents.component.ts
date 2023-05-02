import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { OtherDocumentsUploadService } from 'src/app/services/other-documents-upload.service';
import { UploadDocumentDialogComponent } from './upload-document-dialog/upload-document-dialog.component';
import { ViewDocumentDialogComponent } from './view-document-dialog/view-document-dialog.component';

@Component({
  selector: 'app-attached-documents',
  templateUrl: './attached-documents.component.html',
  styleUrls: ['./attached-documents.component.scss'],
})
export class AttachedDocumentsComponent implements OnInit, OnDestroy {
  // items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  // items = ['1', '2', '3', '4'];
  items = [];
  expandedIndex = 0;
  candidateDetails: any;
  candidateId: any;
  otherUploadedDocumentsList: any;
  subscriptions: Subscription[] = [];

  constructor(
    public _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService,
    private _otherDocumentsUploadSvc: OtherDocumentsUploadService
  ) {}

  ngOnInit(): void {
    this.onGetParams();
  }

  openUploadDocumentDialog() {
    const dialogRef = this._dialog.open(UploadDocumentDialogComponent, {
      width: '600px',
      data: {
        candidateDetails: this.candidateDetails,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
        this.onGetOtherDocuments(this.candidateId);
      }
    });
    this.subscriptions.push(subscription);
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        
        let candidateId = params.get('candidateId');
        this.candidateId = candidateId;
        this.onGetCandidateInformation(candidateId);
        this.onGetOtherDocuments(candidateId);
      },
      error: (err: any) => {
        
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCandidateInformation(candidateId: any) {
    let subscription = this._identitySvc.getUserById(candidateId).subscribe({
      next: (response: any) => {
        console.log('this.candidateDetails response: ', response);
        this.candidateDetails = response;
        console.log('this.candidateDetails: ', this.candidateDetails);
      },
      error: (err: any) => {
        
      },
    });
    this.subscriptions.push(subscription);
  }

  onPreviewFile(Uploaded: string) {
    const dialogRef = this._dialog.open(ViewDocumentDialogComponent, {
      width: '100%',
      // maxWidth: '850px',
      data: { CV_URL: Uploaded },
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  onGetOtherDocuments(CandidateId: any) {
    let subscription = this._otherDocumentsUploadSvc
      .getOtherDocumentsUpload(CandidateId)
      .subscribe({
        next: (response: any) => {
          this.otherUploadedDocumentsList = response?.Data;
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  onRemoveDoc(DocId: string) {
    let confirmDelete = confirm(
      'Are you sure you want to delete this document?'
    );
    if (!confirmDelete) {
      return;
    } else {
      let subscription = this._otherDocumentsUploadSvc
        .removeDocument(DocId)
        .subscribe({
          next: (response: any) => {
            if (response) {
              
              this.onGetOtherDocuments(this.candidateId);
            }
          },
          error: (err: any) => {
            
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
