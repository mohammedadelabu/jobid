import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  CompanyProcess,
  CompanyProcessService,
} from 'src/app/services/company-process.service';
import { IdentityService } from 'src/app/services/identity.service';
import { InterviewProcessService } from 'src/app/services/interview-process.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import {
  VacancyProcess,
  VacancyProcessService,
} from 'src/app/services/vacancy-process.service';

@Component({
  selector: 'app-add-company-process',
  templateUrl: './add-company-process.component.html',
  styleUrls: ['./add-company-process.component.scss'],
})
export class AddCompanyProcessComponent implements OnInit, OnDestroy {
  AddProcessForm!: FormGroup;
  updatedBy: any;
  subscriptions: Subscription[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { vacancyId: any },
    private _identitySvc: IdentityService,
    private _companyProcessSvc: CompanyProcessService,
    private _vacancyProcessSvc: VacancyProcessService,
    private _messengerSvc: MessengerService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCompanyProcessComponent>
  ) {}

  ngOnInit(): void {
    this.getProcessDetails();
    this.buildForm();
    this.onGetUpdatedBy();
    // this.prefillForm(this.data.processData);
  }

  getProcessDetails() {
    console.log('Process Details: ', this.data);
    // this.companyId = this.data.companyId
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  buildForm() {
    this.AddProcessForm = this._fb.group({
      Name: ['', Validators.required],
      // DateCompleted: ['', Validators.required],
      // Successful: null,
    });
  }

  // onSubmit() {
  //   console.log('this.AddProcessForm: ', this.AddProcessForm.value);
  //   const Payload: CompanyProcess = {
  //     Name: this.AddProcessForm.value.Name,
  //     UpdatedBy: this.onGetUpdatedBy(),
  //     companyId: this.data.companyId,
  //   };
  //   
  //   console.log('companyId: ', this.data.companyId);
  //   if (this.AddProcessForm.valid) {
  //     this._companyProcessSvc
  //       .addCompanyProcess(Payload, this.data.companyId)
  //       .subscribe({
  //         next: (response: any) => {
  //           
  //           this._messengerSvc.sendSubject('Process added!');
  //           this.closeDialog();
  //         },
  //         error: (err: any) => {
  //           console.warn('Error: ', err);
  //         },
  //       });
  //   }
  // }
  // closeDialog() {
  //   this.dialogRef.close('Pizza!');
  // }

  onSubmit() {
    console.log('this.AddProcessForm: ', this.AddProcessForm.value);
    const Payload: VacancyProcess = {
      Name: this.AddProcessForm.value.Name,
      // DateCompleted: '',
      Successful: false,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
    console.log('companyId: ', this.data.vacancyId);
    if (this.AddProcessForm.valid) {
      let subscription = this._vacancyProcessSvc
        .addVacancyProcess(Payload, this.data.vacancyId)
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
