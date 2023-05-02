import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OtherDocumentCompany } from 'src/app/models/types/other-document-upload';
import { CertificationService } from 'src/app/services/certification.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { OtherDocumentsUploadService } from 'src/app/services/other-documents-upload.service';

@Component({
  selector: 'app-company-upload-document-dialog',
  templateUrl: './company-upload-document-dialog.component.html',
  styleUrls: ['./company-upload-document-dialog.component.scss'],
})
export class CompanyUploadDocumentDialogComponent implements OnInit {
  UploadFIleForm!: FormGroup;
  fileLabel = 'Upload document';
  isSelected: boolean = false;
  rawImg: any;
  imgUrl: any;
  uploadedFile!: any;
  AbsoluteFile: any;
  subscription!: Subscription;
  successMessage!: string;
  subscriptions: Subscription[] = [];

  // DocumentTypeList = [
  //   {
  //     Name: 'Resume',
  //     Value: 'Resume',
  //   },
  //   {
  //     Name: 'Guarantor documents',
  //     Value: 'Guarantor documents',
  //   },
  //   {
  //     Name: 'Score card',
  //     Value: 'Score card',
  //   },
  //   {
  //     Name: 'Others',
  //     Value: 'Others',
  //   },
  // ];
  constructor(
    private _fb: FormBuilder,
    private _certificationSvc: CertificationService,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: any },
    private _otherDocumentsUploadSvc: OtherDocumentsUploadService,
    public dialogRef: MatDialogRef<CompanyUploadDocumentDialogComponent>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.UploadFIleForm = this._fb.group({
      DocumentName: ['', Validators.required],
      RawFile: ['', Validators.required],
    });
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = e.target.files[0];
        this.fileLabel = this.uploadedFile.name;
        this.isSelected = true;


        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);

        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {

              // console.log(response[0].AbsoluteUrl);
              this.AbsoluteFile = response[0].AbsoluteUrl;
              localStorage.setItem(
                'uploadedResumeFile',
                JSON.stringify(this.AbsoluteFile)
              );
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }
  onSubmit() {
    console.log('UploadFIleForm: ', this.UploadFIleForm.value);
    const Payload: AttachedDocument = {
      DocumentType: 'Others',
      File: this.AbsoluteFile,
    };

    console.log('UploadFIleForm Payload: ', Payload);
    this.onSaveOtherDocuments(this.UploadFIleForm.value);
  }
  onSaveOtherDocuments(UploadFIleForm: any) {
    const Payload: OtherDocumentCompany = {
      IsUser: false,
      DocumentName: UploadFIleForm.DocumentName,
      DocumentType: 'Others',
      UploadUrl: this.AbsoluteFile,
      CompanyId: this.data.companyId,
    };
    console.log('UploadFIleForm Payload: ', Payload);
    let subscription = this._otherDocumentsUploadSvc
      .addOtherDocumentsUploadForCompany(Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {

            this.successMessage = 'Document uploaded!';
            this.UploadFIleForm.reset();
            setTimeout(() => {
              this.dialogRef.close('Document uploaded!');
            }, 2000);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}

interface AttachedDocument {
  DocumentType: string;
  File: string;
}
