import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { EducationService } from 'src/app/services/education.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss'],
})
export class AddEducationComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddEducation = new EventEmitter();

  educationForm!: FormGroup;
  countryList!: Country[];
  responseMsg: any;
  Subscriptions: Subscription[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    private _educationSvc: EducationService,
    private _router: Router,
    private _countryListSvc: CountryListService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  buildForm() {
    this.educationForm = this._formBuilder.group({
      SchoolName: '',
      SchoolLocation: '',
      Degree: '',
      Field: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    return updatedBy;
  }

  saveData() {
    const formData = {
      SchoolName: this.educationForm.value.SchoolName,
      SchoolLocation: this.educationForm.value.SchoolLocation,
      Degree: this.educationForm.value.Degree,
      Field: this.educationForm.value.Field,
      StartDate: this._messengerSvc.reformatDate(
        this.educationForm.value.StartDate
      ),
      StopDate: this._messengerSvc.reformatDate(
        this.educationForm.value.StopDate
      ),
      UpdatedBy: this.onGetUpdatedBy(),
    };
    let subscription =   this._educationSvc.addEducation(formData, this.candidateId).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.responseMsg = response.Msg;
          setTimeout(() => {
            this.responseMsg = '';
            this.educationForm.reset();
            this.onCloseForm();
          }, 2500);
        }
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
    this.Subscriptions.push(subscription);
  }
  onCloseForm() {
    this.closeIsAddEducation.emit(false);
    
  }


  
  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
