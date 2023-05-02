import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Certification } from 'src/app/models/types/certification';
import { CertificationService } from 'src/app/services/certification.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.scss'],
})
export class AddCertificationComponent implements OnInit, OnDestroy {
  certificationForm!: FormGroup;
  label = 'Upload Certificate';
  uploadedFile: any;
  fileName!: any;
  isSelected!: boolean;
  responseMessage = '';
  candidateId: any;
  renamedImage: any;
  rawImg: any;
  fileUrl: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _certificationSvc: CertificationService,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _messengerSvc: MessengerService
  ) {}
  ngOnInit(): void {
    this.onGetCandidateId();
    this.buildCertificationForm();
    // this.getAllCertification();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
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
  buildCertificationForm() {
    this.certificationForm = this._formBuilder.group({
      CertificationName: '',
      CredentialsID: '',
      // CredentialsUrl: '',
      ExpirationYear: '2022-12',
      IssueYear: '2022-01',
      IssuingOrganisation: '',
    });
  }

  saveCertifications() {
    const formData: Certification = {
      CertificationName: this.certificationForm.value.CertificationName,
      IssuingOrganisation: this.certificationForm.value.IssuingOrganisation,
      IssueYear: this._messengerSvc.reformatDate(
        this.certificationForm.value.IssueYear
      ),
      ExpirationYear: this._messengerSvc.reformatDate(
        this.certificationForm.value.ExpirationYear
      ),
      CredentialsID: this.certificationForm.value.CredentialsID,
      CredentialsUrl: this.fileUrl,
    };

   

    
    let subscription = this._certificationSvc
      .addCertification(formData, this.candidateId)
      .subscribe((response: any) => {
        if (response) {          
          this.responseMessage = response.Msg;
          setTimeout(() => {
            this.certificationForm.reset();
            this._certificationSvc.sendAddBehaviouralMsg(false);
          }, 2500);
        }
      });
    this.subscriptions.push(subscription);
  }

  selectResumeFile($event: any) {
    this.uploadedFile = $event.target.files[0];    
    this.fileName = document.getElementById('file-name');
    this.renamedImage = this.uploadedFile.name.replace(
      /(?=\.[^.]+$)/g,
      '_zarttech_cv_certification'
    );
    this.fileName.innerHTML = this.renamedImage;
    this.isSelected = true;
    this.uploadImage();
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.uploadedFile);
    let subscription = this._certificationSvc
      .uploadCertificationFile(formData)
      .subscribe({
        next: (response: any) => {
          this.fileUrl = response[0].AbsoluteUrl;
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  cancelForm() {
    this._certificationSvc.sendAddBehaviouralMsg(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
