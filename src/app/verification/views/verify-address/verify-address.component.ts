import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/types/country';
import { CertificationService } from 'src/app/services/certification.service';
import { CountryListService } from 'src/app/services/country-list.service';

@Component({
  selector: 'app-verify-address',
  templateUrl: './verify-address.component.html',
  styleUrls: ['./verify-address.component.scss'],
})
export class VerifyAddressComponent implements OnInit {
  verifyAddressForm!: FormGroup;
  label = '';
  rawImg!: string;
  imgUrl!: string;
  uploadedFile: any;
  isFile = false;
  UserImage: any;
  CountryList!: Country[];
  fetchImageUrlErrorMsg: any;
  constructor(
    private _certificationSvc: CertificationService,
    private _fb: FormBuilder,
    private _countrySvc: CountryListService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetCountryList();
  }

  buildForm() {
    this.verifyAddressForm = this._fb.group({
      Street: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Zipcode: ['', Validators.required],
      Location: ['', Validators.required],
    });
  }

  onGetCountryList() {
    this.CountryList = this._countrySvc.getCountryList();
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.rawImg);
    // console.log(formData);

    // const myRenamedFile = new File([this.rawImg], `zarttech-image-${new Date().getTime().toString()}`);
    // console.log(myRenamedFile);
    // const formData = new FormData();
    // formData.append('UploadFile', myRenamedFile);
    // console.log(formData);

    this._certificationSvc
      .uploadCertificationFile(formData)
      // this._http
      //   .post(
      //     'https://cvplatform.azurewebsites.net/api/Certification/UploadDocuments',
      //     formData
      //   )
      .subscribe({
        next: (response: any) => {
          // console.log("uploaded image**: ", response);
          console.log(response[0].AbsoluteUrl);
          this.UserImage = response[0].AbsoluteUrl;
        },
        error: (err: any) => {
          console.warn(err);
          if(err){
            this.fetchImageUrlErrorMsg = err?.statusText
          }
        },
      });
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
        this.isFile = true;
        this.uploadImage();
      };
    }
  }
  onSubmit() {
    const Payload = {
      Street: this.verifyAddressForm.value.Street,
      City: this.verifyAddressForm.value.City,
      State: this.verifyAddressForm.value.State,
      Zipcode: this.verifyAddressForm.value.Zipcode,
      Location: this.verifyAddressForm.value.Location,
      Document: this.UserImage,
    };
    
  }
}
