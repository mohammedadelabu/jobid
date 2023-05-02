import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { BasicInformationComponent } from './views/basic-information/basic-information.component';
import { GuarantorComponent } from './views/guarantor/guarantor.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { PasswordVerificationComponent } from './views/password-verification/password-verification.component';
import { PhoneEmailVerificationComponent } from './views/phone-email-verification/phone-email-verification.component';
import { ProofOfExpertiseComponent } from './views/proof-of-expertise/proof-of-expertise.component';
import { SuccessComponent } from './views/success/success.component';
import { UploadIdComponent } from './views/upload-id/upload-id.component';
import { UploadSelfieComponent } from './views/upload-selfie/upload-selfie.component';
import { VerifyAddressComponent } from './views/verify-address/verify-address.component';

const routes: Routes = [
  // {path: '', component: LandingPageComponent},
  // {path: 'basic-information', component: BasicInformationComponent},
  // {path: 'phone-email-verification/:email/:phone', component: PhoneEmailVerificationComponent},
  // {path: 'password-verification', component: PasswordVerificationComponent},
  // {path: 'upload-selfie/:candidateId/:email', component: UploadSelfieComponent},
  // {path: 'upload-id/:candidateId/:email', component: UploadIdComponent},
  // {path: 'verify-address', component: VerifyAddressComponent},
  // {path: 'proof-of-expertise', component: ProofOfExpertiseComponent},
  // {path: 'guarantor', component: GuarantorComponent},
  // {path: 'success', component: SuccessComponent}
  {
    path: '',
    component: VerificationComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'basic-information', component: BasicInformationComponent },
      {
        path: 'phone-email-verification/:email/:phone',
        component: PhoneEmailVerificationComponent,
      },
      {
        path: 'password-verification',
        component: PasswordVerificationComponent,
      },
      {
        path: 'upload-selfie/:candidateId/:email',
        component: UploadSelfieComponent,
      },
      { path: 'upload-id/:candidateId/:email', component: UploadIdComponent },
      { path: 'verify-address/:candidateId/:email', component: VerifyAddressComponent },
      { path: 'proof-of-expertise', component: ProofOfExpertiseComponent },
      { path: 'guarantor/:candidateId/:email', component: GuarantorComponent },
      { path: 'success', component: SuccessComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule {}
