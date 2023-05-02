import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-upload-academic-professional-certificate',
  templateUrl: './upload-academic-professional-certificate.component.html',
  styleUrls: ['./upload-academic-professional-certificate.component.scss'],
})
export class UploadAcademicProfessionalCertificateComponent
  implements OnInit, OnDestroy
{
  proofOfExpertiseForm!: FormGroup;
  label = 'Select a file';
  rawImg!: string;
  imgUrl!: string;
  uploadedFile: any;
  isFile = false;
  UserImage: any;
  isReadyToBeSaved = false;
  subscriptions: Subscription[] = [];
  constructor(
    private _certificationSvc: CertificationService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.rawImg);
    let subscription = this._certificationSvc
      .uploadCertificationFile(formData)
      .subscribe({
        next: (response: any) => {
          // console.log("uploaded image**: ", response);
          console.log(response[0].AbsoluteUrl);
          this.UserImage = response[0].AbsoluteUrl;
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }
  onSelectFile($event: any) {
    if ($event.target.files) {
      const reader = new FileReader();
      this.rawImg = $event.target.files[0];
      // console.log("this.rawImg***: ", this.rawImg);
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event: any) => {
        // console.log("reader.onload: ", event)
        this.imgUrl = event.target.result;
        this.uploadedFile = $event.target.files[0];
        // console.log("e.target.files: ", e.target.files)
        this.label = this.uploadedFile.name;
        this.isReadyToBeSaved = true;
        this.isFile = true;
        this.uploadImage();
      };
    }
  }
  onSubmit() {
    console.log('proofOfExpertiseForm: ', this.proofOfExpertiseForm.value);
    // const Payload = {
    //   Street: this.proofOfExpertiseForm.value.Street,
    //   City: this.proofOfExpertiseForm.value.City,
    //   State: this.proofOfExpertiseForm.value.State,
    //   Zipcode: this.proofOfExpertiseForm.value.Zipcode,
    //   Location: this.proofOfExpertiseForm.value.Location,
    //   Document: this.UserImage,
    // };
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
