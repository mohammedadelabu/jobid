import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-create-placement',
  templateUrl: './create-placement.component.html',
  styleUrls: ['./create-placement.component.scss'],
})
export class CreatePlacementComponent implements OnInit {
  CreatePlacementForm!: FormGroup;
  LocationList!: Country[];
  JobTypeList!: { Name: string; Value: string }[];
  constructor(
    private _fb: FormBuilder,
    private _LocationSvc: CountryListService,
    private _JobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    this.onGetLocation();
    this.onGetJobType();
    this.buildForm();
  }

  buildForm() {
    this.CreatePlacementForm = this._fb.group({
      JobTitle: '',
      Company: '',
      JobType: '',
      Location: '',
      StartDate: '',
      EndDate: '',
      HoursPerWeek: '',
      HourlyRate: '',
    });
  }

  onGetLocation() {
    this.LocationList = this._LocationSvc.getCountryList();
  }
  onGetJobType() {
    this.JobTypeList = this._JobVacancySvc.getJobTypes();
  }

  onSubmit() {
    console.log('CreatePlacementForm: ', this.CreatePlacementForm.value);
  }

  back() {
    history.back();
  }
}
