import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { Experience } from 'src/app/models/types/experience';
import { CountryListService } from 'src/app/services/country-list.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss'],
})
export class AddExperienceComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddExperience = new EventEmitter();
  workExperienceForm!: FormGroup;
  responseMsg: any;
  countryList!: Country[];
  experienceId: any;
  Subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _countryListSvc: CountryListService,
    private _messengerSvc: MessengerService,
    private _identitySvc: IdentityService,
    private _experienceSvc: ExperienceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
    this.onGetUpdatedBy();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
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
            this.onCloseForm();
          }, 2500);
        });
      this.Subscriptions.push(subscription);
    } else {
      console.warn('Notice: Date not selected!');
    }
  }
  onCloseForm() {
    this.closeIsAddExperience.emit(false);
    
  }
  goBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
