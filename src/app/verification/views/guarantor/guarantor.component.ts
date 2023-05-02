import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/models/types/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.scss'],
})
export class GuarantorComponent implements OnInit, OnDestroy {
  userId = '';
  Email: any;
  Phone: any;
  CandidateId: any;
  guarantorForm!: FormGroup;
  ProfileData: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    // private _router: Router,
    private _route: ActivatedRoute,
    // private _authSvc: AuthenticationService,
    private _identitySvc: IdentityService,
    private _profileSvc: ProfileService
  ) {}

  ngOnInit(): void {
    this.onGetParams();
    this.buidForm();
  }
  buidForm() {
    this.guarantorForm = this._fb.group({
      Guarantor1FullName: ['', Validators.required],
      Guarantor1RelationshipToKin: ['', Validators.required],
      Guarantor1PhoneNumber: ['', Validators.required],
      Guarantor1EmailAddress: ['', [Validators.required, Validators.email]],
      Guarantor2FullName: ['', Validators.required],
      Guarantor2RelationshipToKin: ['', Validators.required],
      Guarantor2PhoneNumber: ['', Validators.required],
      Guarantor2EmailAddress: ['', [Validators.required, Validators.email]],
    });
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (response: any) => {
        
        let candidateEmail = response.get('email');
        let candidateId = response.get('candidateId');
        this.Email = candidateEmail;
        this.CandidateId = candidateId;
        this.onGetCandidateProfile(candidateId);
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

  onGetCandidateProfile(CandidateId: string) {
    let subscription = this._profileSvc
      .getCandidateProfile(CandidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            if (response) {
              let Data = response?.Data[0];
              this.ProfileData = Data;
              this.onPrefillFormData(Data);
            }
          }
        },
        error: (err: any) => {
          if (err) {
            
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onPrefillFormData(Data: any) {
    this.guarantorForm.controls['Guarantor1FullName'].setValue(
      Data?.Guarantor1_FullName
    );
    this.guarantorForm.controls['Guarantor1RelationshipToKin'].setValue(
      Data?.GuarantorI_RelationshipToKin
    );
    this.guarantorForm.controls['Guarantor1PhoneNumber'].setValue(
      Data?.GuarantorI_Phone
    );
    this.guarantorForm.controls['Guarantor1EmailAddress'].setValue(
      Data?.GuarantorI_EmailAddress
    );
    this.guarantorForm.controls['Guarantor2FullName'].setValue(
      Data?.Guarantor2_Fullname
    );
    this.guarantorForm.controls['Guarantor2RelationshipToKin'].setValue(
      Data?.Guarantor2_RelationshipToKin
    );
    this.guarantorForm.controls['Guarantor2PhoneNumber'].setValue(
      Data?.Guarantor2_PhoneNumber
    );
    this.guarantorForm.controls['Guarantor2EmailAddress'].setValue(
      Data?.Guarantor2_EmailAddress
    );
  }

  onSubmit() {
    const Payload: UserProfile = {
      Profession: this.ProfileData.Profession,
      Country: this.ProfileData.Country,
      State: this.ProfileData.State,
      PostalCode: this.ProfileData.PostalCode,
      City: this.ProfileData.City,
      Street: this.ProfileData.Street,
      PortfolioPlatform: this.ProfileData.PortfolioPlatform,
      LinkedinPlatform: this.ProfileData.LinkedinPlatform,
      UpdatedBy: this.onGetUpdatedBy(),
      Guarantor1_FullName: this.guarantorForm.value.Guarantor1FullName,
      GuarantorI_RelationshipToKin:
        this.guarantorForm.value.Guarantor1RelationshipToKin,
      GuarantorI_Phone:
        this.guarantorForm.value.Guarantor1PhoneNumber?.internationalNumber,
      GuarantorI_EmailAddress: this.guarantorForm.value.Guarantor1EmailAddress,
      Guarantor2_Fullname: this.guarantorForm.value.Guarantor2FullName,
      Guarantor2_RelationshipToKin:
        this.guarantorForm.value.Guarantor2RelationshipToKin,
      Guarantor2_PhoneNumber:
        this.guarantorForm.value.Guarantor2PhoneNumber?.internationalNumber,
      Guarantor2_EmailAddress: this.guarantorForm.value.Guarantor2EmailAddress,
      AddressDocumentUrl: this.ProfileData.AddressDocumentUrl,
      IsAddressVerified: this.ProfileData.IsAddressVerified,
      IsGuarantorsVerified: this.ProfileData.IsGuarantorsVerified,
      CV_URL: this.ProfileData.CV_URL,
      AcademicAndProfessionalCertificateUrls:
        this.ProfileData.AcademicAndProfessionalCertificateUrls,
      isPoofOfExpertiseVerified: this.ProfileData.isPoofOfExpertiseVerified,
      IdDocumentUrl: this.ProfileData.IdDocumentUrl,
      IdDocumentType: this.ProfileData.IdDocumentType,
      isGovernmentIdDocumentVerified:
        this.ProfileData.isGovernmentIdDocumentVerified,
      SelfietUrl: this.ProfileData.SelfietUrl,
      isSelfieVerified: this.ProfileData.isSelfieVerified,
    };
    
    let subscription = this._profileSvc
      .updateCandidateProfile(this.ProfileData?.Id, Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetUserProfile() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
