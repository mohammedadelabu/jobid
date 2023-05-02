import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Messaging } from 'src/app/models/types/messaging';
import { CertificationService } from 'src/app/services/certification.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ScheduleInterviewComponent } from 'src/app/shared/components/schedule-interview/schedule-interview.component';

@Component({
  selector: 'app-candidate-messenger',
  templateUrl: './candidate-messenger.component.html',
  styleUrls: ['./candidate-messenger.component.scss'],
})
export class CandidateMessengerComponent implements OnInit, OnDestroy {
  CandidateEmail!: string;
  candidateId: any;
  messagingForm!: FormGroup;
  candidateEmail: any;
  responseMessage!: string;
  messageList: any;
  rawImg: any;
  imgUrl: any;
  uploadedFile: any;
  fileLabel: any;
  isSelected!: boolean;
  AbsoluteFile: any;
  uploadFileError!: string;
  isHeader = false;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _identitySvc: IdentityService,
    private _messagingSvc: MessagingService,
    public _dialog: MatDialog,
    private _certificationSvc: CertificationService
  ) {}

  ngOnInit(): void {
    this.onGetParams();
    this.buildForm();
    console.log('&&&&&&: ', this._route);
  }

  buildForm() {
    this.messagingForm = this._fb.group({
      messageTitle: ['', Validators.required],
      messageBody: ['', Validators.required],
    });
  }

  toggleHeader() {
    this.isHeader = !this.isHeader;
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = e.target.files[0];
        this.fileLabel = this.uploadedFile.name;
        this.isSelected = true;
        

        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);
       
        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {
              
              // console.log(response[0].AbsoluteUrl);
              this.AbsoluteFile = response[0].AbsoluteUrl;
              localStorage.setItem(
                'uploadedResumeFile',
                JSON.stringify(this.AbsoluteFile)
              );
            },
            error: (err: any) => {
              console.warn('Error: ', err);
              if (err) {
                this.uploadFileError =
                  'Something went wrong. Kindly select file again!';
                // this.UploadFIleForm.controls['']
                this.fileLabel = '';
              }
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  onSubmitMessage() {
    const Payload: Messaging = {
      UserId: this.candidateId,
      Body: this.messagingForm.value.messageBody,
      Suject: this.messagingForm.value.messageTitle,
      Date: new Date().toDateString(),
      Sender: this.onGetUpdatedBy(),
      AttachmentUrl: this.AbsoluteFile,
    };
    
    let subscription = this._messagingSvc.postMessage(Payload).subscribe({
      next: (response: any) => {
        
        if (response.Msg) {
          this.onGetParams();
          this.responseMessage = 'Message sent!';
          setTimeout(() => {
            this.responseMessage = '';
            this.messagingForm.reset();
          }, 1500);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  openScheduleInterviewDialog(candidateEmail: any) {
    const dialogRef = this._dialog.open(ScheduleInterviewComponent, {
      width: '700px',
      data: {
        candidateEmail: candidateEmail,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  onGetMessageList(UserId: string) {
    let subscription = this._messagingSvc.getMessages(UserId).subscribe({
      next: (response: any) => {
        
        if (response.ResponseCode == '00') {
          this.messageList = response?.Data?.reverse();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetParams() {
    let subscription =  this._route.paramMap.subscribe({
      next: (params: any) => {
        
        this.candidateId = params.get('candidateId');
        this.candidateEmail = params.get('candidateEmail');
        this.onGetMessageList(this.candidateId);
      },
      error: (err: any) => {
        
      },
    });
    this.subscriptions.push(subscription);
  }

  back() {
    history.back();
  }

  onViewCv() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate([
      '/recruiter/candidates/cv-preview/',
      this.candidateId,
    ]);
  }

  onEditCV() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate(['/edit-candidate-cv/personal-profile/']);
  }

  onDownloadCv() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate([
      'recruiter/candidates/cv-preview/',
      this.candidateId,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
