import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { IdentityService } from 'src/app/services/identity.service';
import { OtherDocumentsUploadService } from 'src/app/services/other-documents-upload.service';
import { ViewDocumentDialogComponent } from '../../candidates/attached-documents/view-document-dialog/view-document-dialog.component';
import { CompanyUploadDocumentDialogComponent } from './company-upload-document-dialog/company-upload-document-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-attached-documents',
  templateUrl: './company-attached-documents.component.html',
  styleUrls: ['./company-attached-documents.component.scss'],
})
export class CompanyAttachedDocumentsComponent implements OnInit, OnDestroy {
  // items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  // items = ['1', '2', '3', '4']
  items = [];
  expandedIndex = 0;
  candidateDetails: any;
  companyId: any;
  otherUploadedDocumentsList: any;
  subscriptions: Subscription[] = [];

  constructor(
    public _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService,
    private _companySvc: CompanyService,
    private _otherDocumentsUploadSvc: OtherDocumentsUploadService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetParams();
  }

  openUploadDocumentDialog() {
    const dialogRef = this._dialog.open(CompanyUploadDocumentDialogComponent, {
      width: '600px',
      data: {
        companyId: this.companyId,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.onGetOtherDocuments(this.companyId);
      }
    });
    this.subscriptions.push(subscription);
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {

        let companyId = params.get('companyId');
        this.companyId = companyId;
        console.log('this.companyId: ', this.companyId);
        this.onGetOtherDocuments(companyId);
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
      if (result) {

      }
    });
    this.subscriptions.push(subscription);
  }

  onGetOtherDocuments(CompanyId: any) {
    let subscription = this._otherDocumentsUploadSvc
      .getOtherDocumentsUploadForCompany(CompanyId)
      .subscribe({
        next: (response: any) => {
          console.log('other uploaded documents: ', response);
          this.otherUploadedDocumentsList = response?.Data;
        },
        error: (err: any) => {

        },
      });
    this.subscriptions.push(subscription);
  }

  onRemoveDoc(DocId: string) {
    console.log('DocId: ', DocId);
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

              this.onGetOtherDocuments(this.companyId);
              this._toastr.success(response?.ResponseMessage);
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
