import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-admin-upload-candidate-cv',
  templateUrl: './admin-upload-candidate-cv.component.html',
  styleUrls: ['./admin-upload-candidate-cv.component.scss'],
})
export class AdminUploadCandidateCvComponent implements OnInit, OnDestroy {
  label = 'Drag & Drop your file';
  uploadedFile!: any;
  fileName: any;
  isSelected: boolean = false;
  imgUrl: any;
  rawImg: any;
  UserImage: any;
  fileContent: any;
  candidateId: any;
  responseMessage = '';

  //
  testFileForm!: FormGroup;
  subscriptions: Subscription[] = [];
  //
  constructor(
    private _http: HttpClient,
    private _certificationSvc: CertificationService,
    private _editedCandidateSvc: EditCandidateCvService,
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.buildTestFileForm();
  }

  // buildTestFileForm() {
  //   this.testFileForm = this._fb.group({
  //     MyFile: '',
  //   });
  // }
  // uploadMyFile() {
  //   console.log('this.testFileForm: ', this.testFileForm);
  // }

  onSelectTestFile($event: any) {
    if ($event.target.files) {
      const reader = new FileReader();
      this.rawImg = $event.target.files[0];
      
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        // this.uploadedFile = event.target.files[0];
        // this.label = this.uploadedFile.name;

        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);

        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {
              
              // console.log(response[0].AbsoluteUrl);
              this.UserImage = response[0].AbsoluteUrl;
            },
            error: (err: any) => {
              console.warn(err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
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
              
              // console.log(response[0].AbsoluteUrl);
              this.UserImage = response[0].AbsoluteUrl;
              localStorage.setItem(
                'uploadedResumeFile',
                JSON.stringify(this.UserImage)
              );
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.rawImg);
    let subscription = this._certificationSvc
      .uploadCertificationFile(formData)
      .subscribe({
        next: (response: any) => {
          this.UserImage = response[0].AbsoluteUrl;

          /* FILE SCRAPPER */
          if (response) {
            let _formData = new FormData();
            _formData.append('file', this.uploadedFile);
            this._http
              .post(
                'https://cvreader.pythonanywhere.com/api/v1/upload/',
                _formData
              )
              .subscribe({
                next: (response: any) => {
                  if (response) {
                    this.fileContent = response;
                    localStorage.setItem(
                      'uploadedCvData',
                      JSON.stringify(this.fileContent)
                    );
                    this._router.navigate([
                      '/recruiter/candidates/upload-candidate-cv/registration',
                    ]);
                  }
                },
                error: (err: any) => {
                  console.warn('Error: ', err);
                  // THE IS AN ISSUE WITH THE SCRAPPER. SO WE NEED TO ROUTE TO THE FORM PAGE REGARDLESS. UNTIL ABDULRASHEED CAN RESOLVE THE ISSUE
                  this._router.navigate([
                    '/recruiter/candidates/upload-candidate-cv/registration',
                  ]);
                },
              });
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  clearControl() {
    this.uploadedFile = null;
    this.isSelected = false;
    location.reload();
  }

  goBack() {
    window.history.back();
  }

  prepareData() {
    // this.candidateId = this._editedCandidateSvc.retrieveCandidateInformation();
    // 

    let subscription = this._route.paramMap.subscribe({
      next: (param: any) => {
        let candidateEmail = param.get('candidateEmail');
        console.log({
          candidateEmail: candidateEmail,
        });
        this._http
          .post(
            'https://zartjobid-engine.azurewebsites.net/cv/api/Identity/GetEmail',
            {
              Email: candidateEmail,
            }
          )
          .subscribe({
            next: (response: any) => {
              

              let updatedData = {
                FirstName: response.FirstName,
                LastName: response.LastName,
                UserImage: response.ProfileImageUrl,
                PhoneNumber: response.PhoneNumber,
                Status: response.Status,
                StatusComment: response.StatusComment,
                CV_URL: this.UserImage,
                PortfolioPlatform: response.StatusComment,
                LinkedinPlatform: response.StatusComment,
              };
              console.log('updatedData: ', updatedData);
              this._identitySvc
                .updatePersonalInfo(updatedData, candidateEmail)
                .subscribe({
                  next: (response: any) => {
                    
                    this.responseMessage = response;
                    setTimeout(() => {
                      this.responseMessage = '';
                      this.clearControl();
                    }, 2000);
                  },
                  error: (err: any) => {
                    
                  },
                });
            },
            error: (err: any) => {
              
            },
          });
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
