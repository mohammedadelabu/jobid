import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { Experience } from 'src/app/models/types/experience';
import { CountryListService } from 'src/app/services/country-list.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-work-experience',
  templateUrl: './add-work-experience.component.html',
  styleUrls: ['./add-work-experience.component.scss'],
})
export class AddWorkExperienceComponent implements OnInit, OnDestroy {
  workExperienceForm!: FormGroup;
  responseMsg: any;
  countryList!: Country[];
  experienceId: any;
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _messengerSvc: MessengerService,
    private _countryListSvc: CountryListService,
    private _experienceSvc: ExperienceService,
    private _identitySvc: IdentityService,
    private _router: Router,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
    this.onGetCandidateId();
    this.onGetUpdatedBy();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  buildForm() {
    this.workExperienceForm = this._formBuilder.group({
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
  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSaveWorkExperience() {
    const newData: Experience = {
      EmployerName: this.workExperienceForm.value.EmployerName,
      JobTitle: this.workExperienceForm.value.JobTitle,
      Industry: this.workExperienceForm.value.Industry,
      Location: this.workExperienceForm.value.Location,
      Description: this.workExperienceForm.value.Description,
      TeamSize: this.workExperienceForm.value.TeamSize,
      TechStack: this.workExperienceForm.value.TechStack,
      StartDate: this._messengerSvc.reformatDate(
        this.workExperienceForm.value.StartDate
      ),
      EndDate: this._messengerSvc.reformatDate(
        this.workExperienceForm.value.EndDate
      ),
      Currently: this.workExperienceForm.value.Currently,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
    if (newData.StartDate && newData.EndDate) {
      let subscription = this._experienceSvc
        .addWorkExperience(newData, this.candidateId)
        .subscribe((response: any) => {
          
          this.responseMsg = response.Mgs;
          setTimeout(() => {
            this.workExperienceForm.reset();
            this._router.navigate(['/edit-candidate-cv/work-history/']);
          }, 2500);
        });
      this.subscriptions.push(subscription);
    } else {
      console.warn('Notice: Date not selected!');
    }
  }

  goBack() {
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
