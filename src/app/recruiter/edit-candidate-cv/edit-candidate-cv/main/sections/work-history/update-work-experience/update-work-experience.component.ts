import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-update-work-experience',
  templateUrl: './update-work-experience.component.html',
  styleUrls: ['./update-work-experience.component.scss'],
})
export class UpdateWorkExperienceComponent implements OnInit, OnDestroy {
  countryList!: Country[];
  updateWorkExperienceForm!: FormGroup;
  candidateId: any;
  experienceId!: string;
  responseMsg: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _countryListSvc: CountryListService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _experienceSvc: ExperienceService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
    this.getExperienceId();
    this.onGetCandidateId();
    this.getExperienceData(this.candidateId, this.experienceId);
    this.onGetUpdatedBy();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  getExperienceId() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        this.experienceId = params.get('id');
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getExperienceData(CandidateId: string, ExperienceId: string) {
    let subscription = this._experienceSvc
      .getCandidateWorkHistory(CandidateId)
      .subscribe((response: any) => {
        let workHistoryList = response;
        let item = workHistoryList?.filter((x: any) => {
          return ExperienceId === x.Id;
        });
        
        this.prefillCandidateData(item[0]);
      });
    this.subscriptions.push(subscription);
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

  prefillCandidateData(Data: any) {
    // this.workHistoryId = item[0].id;
    // let startDate = this.formatConvertion(Data.StartDate);
    // let endDate = this.formatConvertion(Data.EndDate);
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
        this.responseMsg = response.Mgs;
        this._router.navigate(['/edit-candidate-cv/work-history']);
        // administrator/edit-candidate-data/work-history/update-experience/:id
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
