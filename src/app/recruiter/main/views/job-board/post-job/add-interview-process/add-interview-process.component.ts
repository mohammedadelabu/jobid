import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterviewProcess } from 'src/app/models/types/interview-process';
import { IdentityService } from 'src/app/services/identity.service';
// import { InterviewProcess } from 'src/app/models/types/interview-process';
import { InterviewProcessService } from 'src/app/services/interview-process.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-add-interview-process',
  templateUrl: './add-interview-process.component.html',
  styleUrls: ['./add-interview-process.component.scss'],
})
export class AddInterviewProcessComponent implements OnInit, OnDestroy {
  ProcessForm!: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _interviewProcessSvc: InterviewProcessService,
    public dialogRef: MatDialogRef<AddInterviewProcessComponent>,
    private _route: ActivatedRoute,
    private _messengerSvc: MessengerService,
    @Inject(MAT_DIALOG_DATA) public data: { vacancyId: string }
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getParams();
    this.onGetUpdatedBy();
  }

  buildForm() {
    this.ProcessForm = this._fb.group({
      Name: ['', Validators.required],
      DateCompleted: ['', Validators.required],
    });
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        
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

  onAddProcess() {
    console.log(this.ProcessForm.value);
    // console.log(this.ProcessForm.valid)
    // if (this.ProcessForm.valid) {
    //   let Process: InterviewProcess = {
    //     Id: new Date().getTime().toString(),
    //     ProcessName: this.ProcessForm.value.ProcessName,
    //     ProcessDate: this.ProcessForm.value.ProcessDate,
    //   };
    //   console.log('Process: ', Process);
    //   this._interviewProcessSvc.addProcess(Process);
    //   this.onNoClick();
    // }

    const Payload: InterviewProcess = {
      Name: this.ProcessForm.value.Name,
      DateCompleted: this.ProcessForm.value.DateCompleted,
      Successful: false,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
    console.log('vacancyId: ', this.data.vacancyId);
    if (this.ProcessForm.valid) {
      let subscription = this._interviewProcessSvc
        .addInterviewProcess(Payload, this.data.vacancyId)
        .subscribe({
          next: (response: any) => {
            
            this._messengerSvc.sendSubject('Process added!');
            this.closeDialog();
          },
          error: (err: any) => {
            console.warn('Error: ', err);
          },
        });
      this.subscriptions.push(subscription);
    }
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
