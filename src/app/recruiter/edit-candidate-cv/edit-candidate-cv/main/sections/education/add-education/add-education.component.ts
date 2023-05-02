import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { EducationService } from 'src/app/services/education.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss'],
})
export class AddEducationComponent implements OnInit {
  educationForm!: FormGroup;
  countryList!: Country[];
  responseMsg: any;
  candidateId: any;
  constructor(private _formBuilder: FormBuilder,
    private _countryListSvc: CountryListService,
    private _messengerSvc: MessengerService,
    private _educationSvc: EducationService,
    private _router: Router,
    private _identitySvc: IdentityService,
    private _editCandidateCvSvc: EditCandidateCvService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
    this.onGetCandidateId();
    this.onGetUpdatedBy();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
    // console.log('countries: ', this._countryListSvc.getCountryList());
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
  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
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
    this._educationSvc.addEducation(formData, this.candidateId).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.responseMsg = response.Msg;
          setTimeout(() => {
            this.responseMsg = '';
            this.educationForm.reset();
            this._router.navigate([
              '/edit-candidate-cv/education',
            ]);
          }, 2500);
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }
}
