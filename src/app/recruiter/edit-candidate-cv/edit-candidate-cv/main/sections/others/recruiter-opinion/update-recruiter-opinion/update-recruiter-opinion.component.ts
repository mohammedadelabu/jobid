import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';

@Component({
  selector: 'app-update-recruiter-opinion',
  templateUrl: './update-recruiter-opinion.component.html',
  styleUrls: ['./update-recruiter-opinion.component.scss'],
})
export class UpdateRecruiterOpinionComponent implements OnInit, OnDestroy {
  recruiterOpinionForm!: FormGroup;
  responseMessage = '';
  candidateId: any;
  OpinionId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _recruiterOpinionSvc: RecruiterOpinionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    let subscription = this._recruiterOpinionSvc
      .getRecruiterOpinionSubjectItem()
      .subscribe({
        next: (response: any) => {
          this.handleIsEdit(response);
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.recruiterOpinionForm = this._formBuilder.group({
      opinion: '',
    });
  }

  updateOpinion() {
    let subscription = this._recruiterOpinionSvc
      .updateRecruiterOpinion(this.OpinionId, this.recruiterOpinionForm.value)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this._recruiterOpinionSvc.sendEditBehaviouralMsg(false);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  handleIsEdit(Opinion: any) {
    this.OpinionId = Opinion.Id;
    this.recruiterOpinionForm.controls['opinion'].setValue(Opinion.opinion);
  }
  cancelForm() {
    this._recruiterOpinionSvc.sendAddBehaviouralMsg(false);
  }

  cancelEdit() {
    this._recruiterOpinionSvc.sendEditBehaviouralMsg(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
