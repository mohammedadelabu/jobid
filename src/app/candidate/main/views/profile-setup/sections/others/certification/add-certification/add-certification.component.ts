import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Certification } from 'src/app/models/types/certification';
import { CertificationService } from 'src/app/services/certification.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.scss'],
})
export class AddCertificationComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddCertification = new EventEmitter();
  certificationForm!: FormGroup;
  label = 'Upload Certificate';
  uploadedFile: any;
  fileName!: any;
  isSelected!: boolean;
  responseMessage = '';
  renamedImage: any;
  rawImg: any;
  fileUrl: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _certificationSvc: CertificationService,
    private _messengerSvc: MessengerService
  ) {}
  ngOnInit(): void {
    this.buildCertificationForm();
    // this.getAllCertification();
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
       
        this._certificationSvc.uploadCertificationFile(formData).subscribe({
          next: (response: any) => {
            
            // console.log(response[0].AbsoluteUrl);
            this.fileUrl = response[0].AbsoluteUrl;
          },
          error: (err: any) => {
            console.warn('Error: ', err);
          },
        });
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
    this._certificationSvc
      .addCertification(formData, this.candidateId)
      .subscribe((response: any) => {
        if (response) {          
          this.responseMessage = response.Msg;
          setTimeout(() => {
            this.certificationForm.reset();
            this.onCloseForm();
          }, 2500);
        }
      });
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
    this._certificationSvc.uploadCertificationFile(formData).subscribe({
      next: (response: any) => {
        this.fileUrl = response[0].AbsoluteUrl;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }

  onCloseForm() {
    this.closeIsAddCertification.emit(false);
    
  }
  goBack() {
    history.back();
  }
}
