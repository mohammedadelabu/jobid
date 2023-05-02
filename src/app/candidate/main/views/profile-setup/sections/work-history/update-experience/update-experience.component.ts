import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.scss'],
})
export class UpdateExperienceComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Output() closeIsUpdateExperience = new EventEmitter();
  experienceId!: string;
  updateWorkExperienceForm!: FormGroup;
  countryList!: Country[];
  responseMsg: any;
  candidateId!: string;
  Subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _countryListSvc: CountryListService,
    private _messengerSvc: MessengerService,
    private _experienceSvc: ExperienceService,
    private _router: Router,
    private _identitySvc: IdentityService,
    public dialogRef: MatDialogRef<UpdateExperienceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { experienceId: string; candidateId: string }
  ) {}

  ngOnInit(): void {
    this.getCountryList();
    this.experienceId = this.data?.experienceId;
    this.candidateId = this.data?.candidateId;
    this.buildForm();
  }

  ngAfterViewInit() {
    this.experienceId = this.data?.experienceId;
    this.candidateId = this.data?.candidateId;
    this.getExperienceData(this.candidateId, this.experienceId);
  }

  buildForm() {
    this.updateWorkExperienceForm = this._formBuilder.group({
      EmployerName: '',
      JobTitle: '',
      Industry: '',
      Location: '',
      Description: '',
      TeamSize: '',
      TechStack: '',
      StartDate: '2022-01',
      EndDate: '2022-12',
      Currently: false,
    });
  }
  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  getExperienceData(CandidateId: string, ExperienceId: string) {
    let subscription = this._experienceSvc
      .getCandidateWorkHistory(CandidateId)
      .subscribe((response: any) => {
        let workHistoryList = response.Data;
        let item = workHistoryList?.filter((x: any) => {
          return ExperienceId === x.Id;
        });
        this.prefillCandidateData(item[0]);
      });
    this.Subscriptions.push(subscription);
  }

  prefillCandidateData(Data: any) {
    let startDate = this._messengerSvc.formatConvertion(Data.StartDate);
    let endDate = this._messengerSvc.formatConvertion(Data.EndDate);
    this.updateWorkExperienceForm.controls['JobTitle'].setValue(Data.JobTitle);
    this.updateWorkExperienceForm.controls['EmployerName'].setValue(
      Data.EmployerName
    );
    this.updateWorkExperienceForm.controls['Location'].setValue(Data.Location);
    this.updateWorkExperienceForm.controls['StartDate'].setValue(startDate);
    this.updateWorkExperienceForm.controls['EndDate'].setValue(endDate);
    this.updateWorkExperienceForm.controls['Description'].setValue(
      Data.Description
    );
    this.updateWorkExperienceForm.controls['TechStack'].setValue(
      Data.TechStack
    );
    this.updateWorkExperienceForm.controls['TeamSize'].setValue(Data.TeamSize);
    this.updateWorkExperienceForm.controls['Currently'].setValue(
      Data.Currently
    );
  }

  saveData() {
    const newData = {
      EmployerName: this.updateWorkExperienceForm.value.EmployerName,
      JobTitle: this.updateWorkExperienceForm.value.JobTitle,
      Industry: this.updateWorkExperienceForm.value.Industry,
      Location: this.updateWorkExperienceForm.value.Location,
      Description: this.updateWorkExperienceForm.value.Description,
      TeamSize: this.updateWorkExperienceForm.value.TeamSize,
      TechStack: this.updateWorkExperienceForm.value.TechStack,
      StartDate: this._messengerSvc.reformatDate(
        this.updateWorkExperienceForm.value.StartDate
      ),
      EndDate: this._messengerSvc.reformatDate(
        this.updateWorkExperienceForm.value.EndDate
      ),
      Currently: this.updateWorkExperienceForm.value.Currently,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    

    let subscription = this._experienceSvc
      .updateWorkExperience(newData, this.experienceId)
      .subscribe((response: any) => {
        
        if (response.ResponseCode == '200') {
          this.responseMsg = 'Experience updated!';
          setTimeout(() => {
            this.onCloseForm();
          }, 3000);
        }
      });
    this.Subscriptions.push(subscription);
  }

  onCloseForm() {
    this.dialogRef.close('close');
    
    this.closeIsUpdateExperience.emit(false);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
