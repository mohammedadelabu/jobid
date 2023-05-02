import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/models/types/user-profile';
import { CertificationService } from 'src/app/services/certification.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent implements OnInit, OnDestroy {
  // latest snapshot
  // public webcamImage: WebcamImage = null;
  public webcamImage!: WebcamImage;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  rawFile!: File;
  imgUrl: any;
  uploadedFile!: File;
  label!: string;
  isFile!: boolean;
  UserImage: any;
  Email: any;
  UserProfile: any;
  candidateId: any;
  selfieUploadSuccessMessage!: string;
  isWebcamImage!: boolean;
  subscriptions: Subscription[] = [];
  constructor(
    private _certificationSvc: CertificationService,
    // private _authSvc: AuthenticationService,
    private _profileSvc: ProfileService,
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    // this.test();
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
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  updateUserSelfieUrl(userData: any, SelfietUrl: string) {
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
      IdDocumentUrl: userData.IdDocumentUrl,
      IdDocumentType: userData.IdDocumentType,
      isGovernmentIdDocumentVerified: userData.isGovernmentIdDocumentVerified,
      SelfietUrl: SelfietUrl,
      isSelfieVerified: userData.isSelfieVerified,
    };
    console.log(Payload);
    let subscription = this._profileSvc
      .updateCandidateSelfie(ProfileId, Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response.ResponseCode == '200') {
            this.selfieUploadSuccessMessage = 'Selfie successfully uploaded';
          }
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  retakeSelfie() {
    this.isWebcamImage = false;
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.warn('Camera access was not allowed by user!');
    }
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  test() {
    //Usage example:
    let file = this.dataURLtoFile(
      this.webcamImage?.imageAsDataUrl,
      'hello.png'
    );
    this.rawFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(this.rawFile);
    reader.onload = (event: any) => {
      // console.log("reader.onload: ", event)
      this.imgUrl = event.target.result;
      this.uploadedFile = this.rawFile;
      // console.log("e.target.files: ", e.target.files)
      this.label = this.uploadedFile.name;
      this.isFile = true;
      this.uploadImage();
    };
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.isWebcamImage = true;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.rawFile);
    console.log(formData);

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
          if (response) {
            this.updateUserSelfieUrl(this.UserProfile, this.UserImage);
            
            console.log(
              'Payload: ',
              this.updateUserSelfieUrl(this.UserProfile, this.UserImage)
            );
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    this.test();
    // const Payload = {
    //   Selfie: this.webcamImage?.imageAsDataUrl,
    // };
    // this.updateUserSelfieUrl(this.UserProfile)
    
    // console.log('Payload: ',   this.updateUserSelfieUrl(this.UserProfile));
  }

  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl?.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
