import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Certification } from 'src/app/models/types/certification';
import { CertificationService } from 'src/app/services/certification.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { PreviewUploadedCvComponent } from 'src/app/shared/components/preview-uploaded-cv/preview-uploaded-cv.component';

@Component({
  selector: 'app-update-certification',
  templateUrl: './update-certification.component.html',
  styleUrls: ['./update-certification.component.scss'],
})
export class UpdateCertificationComponent implements OnInit, OnDestroy {
  certificationUpdateForm!: FormGroup;
  label = 'Replace Certificate';
  uploadedFile: any;
  fileName!: any;
  isSelected!: boolean;
  responseMessage = '';
  candidateId: any;
  rawImg: any;
  imgUrl: any;
  fileUrl: any;
  certificate: any;
  doc = '';
  certificationId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _certificationSvc: CertificationService,
    private _messengerSvc: MessengerService,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
    let subscription = this._certificationSvc
      .getCertificationSubjectItem()
      .subscribe({
        next: (response: any) => {
          this.certificate = response;
          this.handleIsEdit(response);
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = e.target.files[0];
        this.label = this.uploadedFile.name;
        this.isSelected = true;
        

        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);
       
        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {
              this.fileUrl = response[0].AbsoluteUrl;
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  /* CERTIFICATION */
  buildForm() {
    this.certificationUpdateForm = this._formBuilder.group({
      CertificationName: '',
      CredentialsID: '',
      ExpirationYear: '',
      IssueYear: '',
      IssuingOrganisation: '',
    });
  }

  saveCertifications() {
    const formData: Certification = {
      CertificationName: this.certificationUpdateForm.value.CertificationName,
      IssuingOrganisation:
        this.certificationUpdateForm.value.IssuingOrganisation,
      IssueYear: this._messengerSvc.reformatDate(
        this.certificationUpdateForm.value.IssueYear
      ),
      ExpirationYear: this._messengerSvc.reformatDate(
        this.certificationUpdateForm.value.ExpirationYear
      ),
      CredentialsID: this.certificationUpdateForm.value.CredentialsID,
      CredentialsUrl: this.fileUrl,
    };

   
    let subscription = this._certificationSvc
      .updateCertification(formData, this.certificationId)
      .subscribe({
        next: (response: any) => {
          if (response) {            
            this.cancelEdit();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  selectResumeFile($event: any) {
    this.uploadedFile = $event.target.files[0];    
    this.fileName = document.getElementById('file-name');
    this.fileName.innerHTML = this.uploadedFile.name;
    this.isSelected = true;
  }

  handleIsEdit(Certification: any) {
    this.certificationId = Certification.Id;
    this.doc = Certification?.CredentialsUrl;
    this.certificationUpdateForm.controls['CertificationName'].setValue(
      Certification?.CertificationName
    );
    this.certificationUpdateForm.controls['IssuingOrganisation'].setValue(
      Certification?.IssuingOrganisation
    );
    this.certificationUpdateForm.controls['IssueYear'].setValue(
      this._messengerSvc.formatConvertion(Certification?.IssueYear)
    );
    this.certificationUpdateForm.controls['ExpirationYear'].setValue(
      this._messengerSvc.formatConvertion(Certification?.ExpirationYear)
    );
    this.certificationUpdateForm.controls['CredentialsID'].setValue(
      Certification?.CredentialsID
    );
    this.fileUrl = Certification?.CredentialsUrl;
  }

  cancelEdit() {
    this._certificationSvc.sendEditBehaviouralMsg(false);
  }

  onPreviewUploadedCV(Uploaded: string) {
    const dialogRef = this._dialog.open(PreviewUploadedCvComponent, {
      width: '100%',
      // maxWidth: '850px',
      data: { CV_URL: Uploaded },
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
