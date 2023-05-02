import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateUser } from 'src/app/models/types/user';
import { UserProfile } from 'src/app/models/types/user-profile';
import { CertificationService } from 'src/app/services/certification.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-upload-id',
  templateUrl: './upload-id.component.html',
  styleUrls: ['./upload-id.component.scss'],
})
export class UploadIdComponent implements OnInit, OnDestroy {
  label = '';
  rawImg!: string;
  imgUrl!: string;
  uploadedFile: any;
  isFile = false;
  UserImage: any;
  identityDocumentForm!: FormGroup;
  idDocumentUploadSuccessMessage!: string;
  UserProfile: any;
  candidateId: any;
  Email: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _certificationSvc: CertificationService,
    private _fb: FormBuilder,
    private _profileSvc: ProfileService,
    private _identitySvc: IdentityService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetParams();
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (response: any) => {        
        this.candidateId = response.get('candidateId');
        let candidateEmail = response.get('email');
        this.Email = candidateEmail;
        this.onGetUserProfile(this.candidateId);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }
  onGetUserProfile(UserEmail: string) {
    let subscription = this._profileSvc
      .getCandidateProfile(UserEmail)
      .subscribe({
        next: (response: any) => {
          if (response) {            
            this.UserProfile = response?.Data[0];
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }
  buildForm() {
    this.identityDocumentForm = this._fb.group({
      DocumentType: ['', Validators.required],
      // LastName: ['', Validators.required],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
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

    let subscription = this._certificationSvc
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
        },
      });
    this.subscriptions.push(subscription);
  }
  onSelectFile($event: any) {
    if ($event.target.files) {
      const reader = new FileReader();
      this.rawImg = $event.target.files[0];
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = $event.target.files[0];
        // console.log("e.target.files: ", e.target.files)
        this.label = this.uploadedFile.name;
        this.isFile = true;
        this.uploadImage();
      };
    }
  }
  updateUserIdDocument(
    userData: any,
    UserIdDocumentUrl: string,
    UserIdType: string
  ) {
    const ProfileId = userData?.Id;
    const Payload: UserProfile = {
      Profession: userData.Profession,
      Country: userData.Country,
      State: userData.State,
      PostalCode: userData.PostalCode,
      City: userData.City,
      Street: userData.Street,
      PortfolioPlatform: userData.PortfolioPlatform,
      LinkedinPlatform: userData.LinkedinPlatform,
      UpdatedBy: this.onGetUpdatedBy(),
      Guarantor1_FullName: userData.Guarantor1_FullName,
      GuarantorI_RelationshipToKin: userData.GuarantorI_RelationshipToKin,
      GuarantorI_Phone: userData.GuarantorI_Phone,
      GuarantorI_EmailAddress: userData.GuarantorI_EmailAddress,
      Guarantor2_Fullname: userData.Guarantor2_Fullname,
      Guarantor2_RelationshipToKin: userData.Guarantor2_RelationshipToKin,
      Guarantor2_PhoneNumber: userData.Guarantor2_PhoneNumber,
      Guarantor2_EmailAddress: userData.Guarantor2_EmailAddress,
      AddressDocumentUrl: userData.AddressDocumentUrl,
      IsAddressVerified: userData.IsAddressVerified,
      IsGuarantorsVerified: userData.IsGuarantorsVerified,
      CV_URL: userData.CV_URL,
      AcademicAndProfessionalCertificateUrls:
        userData.AcademicAndProfessionalCertificateUrls,
      isPoofOfExpertiseVerified: userData.isPoofOfExpertiseVerified,
      IdDocumentUrl: UserIdDocumentUrl,
      IdDocumentType: UserIdType,
      isGovernmentIdDocumentVerified: userData.isGovernmentIdDocumentVerified,
      SelfietUrl: userData.SelfietUrl,
      isSelfieVerified: userData.isSelfieVerified,
    };
    console.log(Payload);
    let subscription = this._profileSvc
      .updateCandidateSelfie(ProfileId, Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response.ResponseCode == '200') {
            this.idDocumentUploadSuccessMessage =
              'Document successfully uploaded';
          }
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    const Payload = {
      DocType: this.identityDocumentForm.value.DocumentType,
      Document: this.UserImage,
    };
    this.updateUserIdDocument(Payload, Payload.Document, Payload.DocType);
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
