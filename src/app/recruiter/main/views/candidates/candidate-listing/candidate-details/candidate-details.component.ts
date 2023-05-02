import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GeneratePasswordComponent } from 'src/app/authentication/main/components/generate-password/generate-password.component';
import { ResetPasswordComponent } from 'src/app/authentication/main/components/reset-password/reset-password.component';
import { InviteCandidateFormComponent } from 'src/app/recruiter/main/components/invite-candidate-form/invite-candidate-form.component';
// import { GeneratePasswordComponent } from 'src/app/authentication/main/components/generate-password/generate-password.component';
// import { ResetPasswordComponent } from 'src/app/authentication/main/components/reset-password/reset-password.component';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { NotificationMessagesService } from 'src/app/services/notification-messages.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { NotificationMessagesComponent } from 'src/app/shared/components/notification-messages/notification-messages.component';
import { RatingsAndReviewsComponent } from 'src/app/shared/components/ratings-and-reviews/ratings-and-reviews.component';
import { ScheduleInterviewComponent } from 'src/app/shared/components/schedule-interview/schedule-interview.component';
import { FlagBlockDialogComponent } from './flag-block-dialog/flag-block-dialog.component';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent implements OnInit, OnDestroy {
  val = 'Technical Skills';
  candidateId!: string;
  candidateProfileDetails: any;
  candidateSkillset: any;
  relatedCandidateList: any;
  totalRecords!: string;
  page = 1;
  count = 0;
  candidateInternalHiringProcess: any = ['item-1'];
  candidateExternalHiringProcess: any;
  UserInformation: any;
  internalProcesses: any;
  updatedBy: any;
  currentRate = 6;
  candidateApplicationList: any;
  subscriptions: Subscription[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5; 
  isUpdating = false
  constructor(
    private _route: ActivatedRoute,
    private _profileSvc: ProfileService,
    private _skillSvc: SkillService,
    public _dialog: MatDialog,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _router: Router,
    private _identitySvc: IdentityService,
    private _vacancyProcessSvc: VacancyProcessService,
    private _messengerSvc: MessengerService,
    private _snackBar: MatSnackBar,
    private _notificationMessagesSvc: NotificationMessagesService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getRouteParams();
    this.onGetZarttVacancyProcess();
    let subscription = this._messengerSvc.getSubject().subscribe({
      next: (response: any) => {
        if (response) {
          this.getRouteParams();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.candidateId = params.get('candidateId');
          console.log(this.candidateId);
        }
      },
      error: (err: any) => { },
    });
    this.subscriptions.push(subscription);
  }
  onDownloadCv() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate([
      'recruiter/candidates/cv-preview/',
      this.candidateId,
    ]);
  }

  onEditCV() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate(['/edit-candidate-cv/personal-profile/']);
  }

  openResetPasswordDialog() {
    const dialogRef = this._dialog.open(ResetPasswordComponent, {
      width: '550px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  openGeneratePasswordDialog() {
    const dialogRef = this._dialog.open(GeneratePasswordComponent, {
      width: '550px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  openScheduleInterviewDialog(candidateEmail: string, candidateId: string) {
    console.log(candidateEmail, candidateId);
    const dialogRef = this._dialog.open(ScheduleInterviewComponent, {
      width: '700px',
      data: {
        candidateEmail: candidateEmail,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  getRouteParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.candidateId = params.get('candidateId');
          this.onGetUserInformation(this.candidateId);
          this.onGetCandidateProfile(this.candidateId);
          this.onGetCandidateSkills(this.candidateId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetUserInformation(userId: any) {
    let subscription = this._identitySvc.getUserById(userId).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('user information details: ', response);
          this.UserInformation = response;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCandidateProfile(candidateId: any) {
    console.warn('candidateId: ', candidateId);
    let subscription = this._profileSvc
      .getCandidateProfile(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateProfileDetails = response;
            console.log(
              'this.candidateProfileDetails!!!: ',
              this.candidateProfileDetails
            );
          } else {
            // this._router.navigate(['/recruiter/candidates']);
            // history.back();
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetCandidateSkills(candidateId: any) {
    let subscription = this._skillSvc
      .getCandidateSkillSet(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateSkillset = response;
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    return this.updatedBy;
  }
  onBlockCandidate(Email: string) {
    const dialogRef = this._dialog.open(FlagBlockDialogComponent, {
      width: '700px',
      data: {
        email: Email,
        status: 'Blocked',
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  onFlagCandidate(Email: string) {
    const dialogRef = this._dialog.open(FlagBlockDialogComponent, {
      width: '700px',
      data: {
        email: Email,
        status: 'Flagged',
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    const Payload = {
      email: '',
      status: '',
      statusComment: '',
    };
    this.subscriptions.push(subscription);
  }

  onGetZarttVacancyProcess() {
    let subscription = this._vacancyProcessSvc
      .getInternalVacancyProcess()
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.internalProcesses = response.Data;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  openReviewDialog() {
    const dialogRef = this._dialog.open(RatingsAndReviewsComponent, {
      width: '650px',
      data: { candidateId: this.candidateId },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  openInvitationDialog() {
    const dialogRef = this._dialog.open(InviteCandidateFormComponent, {
      width: '100%',
      maxWidth: '850px',
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  updateEmptyReferences() {
    this.isUpdating = true;
    this._identitySvc.UpdateEmptyReferenceNumbers().subscribe({
      next: (response: any) => {
        if (response) {
          this.isUpdating = false;
          this._notificationMessagesSvc.addMessage('Reference number updated!');
          // this._snackBar.openFromComponent(NotificationMessagesComponent, {
          //   duration: this.durationInSeconds * 1000,
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          // });
          this._toastr.success("Reference numbers updated!");
          setTimeout(() => {
            this._notificationMessagesSvc.clear();
          }, 2000);
        }
      },
      error: (err: any) => {
        this.isUpdating = false;
        console.warn('Error: ', err);
        this._toastr.error("Failed to update reference numbers");
      },
    });
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
