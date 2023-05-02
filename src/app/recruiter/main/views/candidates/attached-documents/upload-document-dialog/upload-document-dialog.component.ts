import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OtherDocument } from 'src/app/models/types/other-document-upload';
import { CertificationService } from 'src/app/services/certification.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { OtherDocumentsUploadService } from 'src/app/services/other-documents-upload.service';

@Component({
  selector: 'app-upload-document-dialog',
  templateUrl: './upload-document-dialog.component.html',
  styleUrls: ['./upload-document-dialog.component.scss'],
})
export class UploadDocumentDialogComponent implements OnInit, OnDestroy {
  UploadFIleForm!: FormGroup;
  fileLabel = 'Upload document';
  isSelected: boolean = false;
  rawImg: any;
  imgUrl: any;
  uploadedFile!: any;
  AbsoluteFile: any;
  subscriptions: Subscription[] = [];

  DocumentTypeList = [
    {
      Name: 'Resume',
      Value: 'Resume',
    },
    {
      Name: 'Guarantor documents',
      Value: 'Guarantor documents',
    },
    {
      Name: 'Score card',
      Value: 'Score card',
    },
    {
      Name: 'Others',
      Value: 'Others',
    },
  ];
  // candidateId!: string;
  candidateDetails: any;
  uploadFileError!: string;
  successMessage!: string;
  constructor(
    private _fb: FormBuilder,
    private _certificationSvc: CertificationService,
    @Inject(MAT_DIALOG_DATA) public data: { candidateDetails: any },
    public dialogRef: MatDialogRef<UploadDocumentDialogComponent>,
    private _identitySvc: IdentityService,
    private _otherDocumentsUploadSvc: OtherDocumentsUploadService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.candidateDetails = this.data.candidateDetails;
  }

  buildForm() {
    this.UploadFIleForm = this._fb.group({
      DocumentName: ['', Validators.required],
      DocumentType: ['', Validators.required],
      RawFile: ['', Validators.required],
    });
  }

  // onGetCandidateInformation() {
  //   this._identitySvc.getUserById(this.candidateId).subscribe({
  //     next: (response: any) => {
  //
  //       this.onUploadResume(response);
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }
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
              if (err) {
                this.uploadFileError =
                  'Something went wrong. Kindly select file again!';
                // this.UploadFIleForm.controls['']
                this.fileLabel = '';
              }
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  onUploadResume(candidateDetails: any) {
    let Payload;
    if (!this.uploadedFile) {
      Payload = {
        FirstName: candidateDetails.FirstName,
        LastName: candidateDetails.LastName,
        MiddleName: candidateDetails.MiddleName,
        UserImage: candidateDetails.UserImage,
        PhoneNumber: candidateDetails.PhoneNumber,
        CompanyId: candidateDetails.CompanyId,
        Status: candidateDetails.Status,
        StatusComment: candidateDetails.StatusComment,
        CV_URL: candidateDetails.CV_URL,
        PortfolioPlatform: candidateDetails.PortfolioPlatform,
        LinkedinPlatform: candidateDetails.LinkedinPlatform,
        UpdatedBy: candidateDetails.UpdatedBy,
      };
    } else {
      Payload = {
        FirstName: candidateDetails.FirstName,
        LastName: candidateDetails.LastName,
        MiddleName: candidateDetails.MiddleName,
        UserImage: candidateDetails.UserImage,
        PhoneNumber: candidateDetails.PhoneNumber,
        CompanyId: candidateDetails.CompanyId,
        Status: candidateDetails.Status,
        StatusComment: candidateDetails.StatusComment,
        CV_URL: this.AbsoluteFile,
        PortfolioPlatform: candidateDetails.PortfolioPlatform,
        LinkedinPlatform: candidateDetails.LinkedinPlatform,
        UpdatedBy: candidateDetails.UpdatedBy,
      };
    }

    let subscription = this._identitySvc
      .updatePersonalInfo(Payload, candidateDetails.Email)
      .subscribe({
        next: (response: any) => {},
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    switch (this.UploadFIleForm.value.DocumentType) {
      case 'Resume':
        this.onUploadResume(this.candidateDetails);
        break;
      case 'Others':
        this.onSaveOtherDocuments(this.UploadFIleForm.value);
        break;
      default:
        break;
    }
  }

  onSaveOtherDocuments(UploadFIleForm: any) {
    const Payload: OtherDocument = {
      IsUser: true,
      DocumentName: UploadFIleForm.DocumentName,
      DocumentType: UploadFIleForm.DocumentType,
      UploadUrl: this.AbsoluteFile,
      UserId: this.candidateDetails?.Id,
      // CompanyId: '',
    };

    let subscription = this._otherDocumentsUploadSvc
      .addOtherDocumentsUpload(Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.successMessage = 'Document uploaded!';
            this.UploadFIleForm.reset();
            this._messengerSvc.sendBehaviouralSubject('Document uploaded!');
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
