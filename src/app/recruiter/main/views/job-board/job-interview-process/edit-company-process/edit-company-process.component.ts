import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  CompanyProcess,
  CompanyProcessService,
} from 'src/app/services/company-process.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import {
  VacancyProcess,
  VacancyProcessService,
} from 'src/app/services/vacancy-process.service';

@Component({
  selector: 'app-edit-company-process',
  templateUrl: './edit-company-process.component.html',
  styleUrls: ['./edit-company-process.component.scss'],
})
export class EditCompanyProcessComponent implements OnInit, OnDestroy {
  updatedBy: any;
  subscriptions: Subscription[] = [];

  // New Implementation
  existingProcessForm_!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { existingProcesses: any; jobId: string },
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    // private _companyProcessSvc: CompanyProcessService,
    private _vacancyProcessSvc: VacancyProcessService,
    private _messengerSvc: MessengerService,
    public dialogRef: MatDialogRef<EditCompanyProcessComponent>
  ) {}

  ngOnInit(): void {
    this.buildExistingForm_();

    if (this.data.existingProcesses.length) {
      // clear existing form array
      while (this.processes_.length) {
        this.processes_.removeAt(0);
      }

      this.data.existingProcesses.forEach(
        (process: { Name: string; InterviewDate: string }) => {
          this.processes_.push(
            this._fb.group({
              processName: [process.Name, Validators.required],
              date: [
                new Date(process.InterviewDate).toISOString().split('T')[0],
                Validators.required,
              ],
            })
          );
        }
      );
    }
    this.onGetUpdatedBy();
  }

  buildExistingForm_() {
    this.existingProcessForm_ = this._fb.group({
      processes: this._fb.array([this.addAnotherProcess()]),
    });
  }

  get processes_() {
    return this.existingProcessForm_.get('processes') as FormArray;
  }

  addProcess_() {
    this.processes_.push(this.addAnotherProcess());
  }

  removeProcess(index: number) {
    this.processes_.removeAt(index);
  }

  addAnotherProcess() {
    return this._fb.group({
      processName: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onSubmit() {
    //   console.log(this.existingProcessForm_.value);
    const processes = this.existingProcessForm_.value.processes.map(
      (process: { processName: string; date: string }) => ({
        InterviewName: process.processName,
        InterviewDate: process.date,
      })
    );

    this._vacancyProcessSvc.updateCompanyProcess(this.data.jobId, processes);
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
