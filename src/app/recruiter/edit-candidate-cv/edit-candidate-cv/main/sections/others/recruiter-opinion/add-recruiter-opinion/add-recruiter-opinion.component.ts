import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';

@Component({
  selector: 'app-add-recruiter-opinion',
  templateUrl: './add-recruiter-opinion.component.html',
  styleUrls: ['./add-recruiter-opinion.component.scss'],
})
export class AddRecruiterOpinionComponent implements OnInit, OnDestroy {
  recruiterOpinionForm!: FormGroup;
  responseMessage = '';
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _recruiterOpinionSvc: RecruiterOpinionService,
    private _authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetCandidateId();
    this.onGetCandidateId();
  }

  buildForm() {
    this.recruiterOpinionForm = this._formBuilder.group({
      opinion: '',
    });
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
  }

  // getRecruiterOpinion(UserId: any) {
  //   this._recruiterOpinionSvc
  //     .getRecruiterOpinion(UserId)
  //     .subscribe((response: any) => {
  //       // console.log('test data raw: ', response);
  //       // console.log('test data: ', response.Data);
  //       let recruiterOpinions = response.Data;
  //       // this.infoMessage = response.ResponseMessage;
  //       recruiterOpinions.forEach((opinion: any) => {
  //         console.log('**opinion: ', opinion);
  //         console.log('**UserId: ', UserId);

  //         if (this.candidateId === UserId) {
  //           this._recruiterOpinionSvc.sendAddBehaviouralMsg(false);
  //           console.log(
  //             'An opinion has already been created!, You can only update the existing opinion'
  //           );
  //           this.responseMessage =
  //             'An opinion has already been created!, You can only update the existing opinion';
  //         }
  //       });
  //     });
  // }

  saveOpinion() {
    let subscription = this._recruiterOpinionSvc
      .addRecruiterOpinion(this.recruiterOpinionForm.value, this.candidateId)
      .subscribe((response: any) => {
        if (response) {
          this._recruiterOpinionSvc.sendAddBehaviouralMsg(false);
        }
      });
    this.subscriptions.push(subscription);
  }

  cancelForm() {
    this._recruiterOpinionSvc.sendAddBehaviouralMsg(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
