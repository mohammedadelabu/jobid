import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { EducationService } from 'src/app/services/education.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss'],
})
export class UpdateEducationComponent implements OnInit {
  countryList!: Country[];
  updateEducationForm!: FormGroup;
  responseMsg: any;
  educationId!: string;
  candidateId: any;

  constructor(
    private _countryListSvc: CountryListService,
    private _formBuilder: FormBuilder,
    private _messengerSvc: MessengerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _identitySvc: IdentityService,
    private _educationSvc: EducationService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.geteducationParamId();
    this.getCandidateEducation();
    this.getCountryList();
    this.buildForm();
    this.onGetUpdatedBy();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }



  geteducationParamId() {
    this._route.paramMap.subscribe({
      next: (params: any) => {
        this.educationId = params.get('id');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  buildForm() {
    this.updateEducationForm = this._formBuilder.group({
      SchoolName: '',
      SchoolLocation: '',
      Degree: '',
      Field: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }

  getCandidateEducation() {
    
    this._educationSvc.getCandidateEducation(this.candidateId).subscribe({
      next: (response: any) => {
        console.warn('response--------->: ', response);
        let educationList = response;
        let item = educationList.filter((x: any) => {
          return this.educationId === x.Id;
        });
        
        this.prefillCandidateData(item[0]);
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }

  prefillCandidateData(Data: any) {
    let StartDate = this._messengerSvc.formatConvertion(Data?.StartDate);
    let StopDate = this._messengerSvc.formatConvertion(Data?.StopDate);
    // this.workHistoryId = item[0].id;
    this.updateEducationForm.controls['SchoolName'].setValue(Data?.SchoolName);
    this.updateEducationForm.controls['SchoolLocation'].setValue(
      Data?.SchoolLocation.toLowerCase()
    );
    this.updateEducationForm.controls['Degree'].setValue(Data?.Degree);
    this.updateEducationForm.controls['Field'].setValue(Data?.Field);
    this.updateEducationForm.controls['StartDate'].setValue(StartDate);
    this.updateEducationForm.controls['StopDate'].setValue(StopDate);
  }

  saveData() {
    const formData = {
      SchoolName: this.updateEducationForm.value.SchoolName,
      SchoolLocation: this.updateEducationForm.value.SchoolLocation,
      Degree: this.updateEducationForm.value.Degree,
      Field: this.updateEducationForm.value.Field,
      StartDate: this._messengerSvc.reformatDate(
        this.updateEducationForm.value.StartDate
      ),
      StopDate: this._messengerSvc.reformatDate(
        this.updateEducationForm.value.StopDate
      ),
      UpdatedBy: this.onGetUpdatedBy(),
    };

    this._educationSvc
      .updateEducation(formData, this.educationId)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMsg = response.ResponseMessage;
          setTimeout(() => {
            this._router.navigate([
              '/edit-candidate-cv/education',
            ]);
          }, 2000);
        }
      });
  }
}
