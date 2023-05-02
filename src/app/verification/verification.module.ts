import { NgModule } from '@angular/core';
import { VerificationRoutingModule } from './verification-routing.module';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { BasicInformationComponent } from './views/basic-information/basic-information.component';
import { PhoneEmailVerificationComponent } from './views/phone-email-verification/phone-email-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordVerificationComponent } from './views/password-verification/password-verification.component';
import { UploadSelfieComponent } from './views/upload-selfie/upload-selfie.component';
import { WebcamComponent } from './views/upload-selfie/webcam/webcam.component';
import { UploadIdComponent } from './views/upload-id/upload-id.component';import {MatRadioModule} from '@angular/material/radio';
import { VerifyAddressComponent } from './views/verify-address/verify-address.component';
import { ProofOfExpertiseComponent } from './views/proof-of-expertise/proof-of-expertise.component';
import { UploadCvComponent } from './views/proof-of-expertise/upload-cv/upload-cv.component';
import { UploadAcademicProfessionalCertificateComponent } from './views/proof-of-expertise/upload-academic-professional-certificate/upload-academic-professional-certificate.component';
import { GuarantorComponent } from './views/guarantor/guarantor.component';
import { SuccessComponent } from './views/success/success.component';
import { WebcamModule } from 'ngx-webcam';
import { SharedModule } from '../shared/shared.module';
import { VerificationComponent } from './verification.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    BasicInformationComponent,
    PhoneEmailVerificationComponent,
    PasswordVerificationComponent,
    UploadSelfieComponent,
    WebcamComponent,
    UploadIdComponent,
    VerifyAddressComponent,
    ProofOfExpertiseComponent,
    UploadCvComponent,
    UploadAcademicProfessionalCertificateComponent,
    GuarantorComponent,
    SuccessComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    WebcamModule,
    SharedModule
  ],
  exports: [],
})
export class VerificationModule {}
