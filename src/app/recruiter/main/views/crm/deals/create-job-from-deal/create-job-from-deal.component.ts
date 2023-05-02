import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { AddJobVacancy } from 'src/app/models/types/job';
import { CountryListService } from 'src/app/services/country-list.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { LocationService } from 'src/app/services/location.service';
import { SkillService } from 'src/app/services/skill.service';
import { SpokenLanguageService } from 'src/app/services/spoken-language.service';

@Component({
  selector: 'app-create-job-from-deal',
  templateUrl: './create-job-from-deal.component.html',
  styleUrls: ['./create-job-from-deal.component.scss'],
})
export class CreateJobFromDealComponent implements OnInit, OnDestroy {
  @select((s) => s.skillsList.skillsList) skillsList$: any;
  @select((s) => s.deals.isLoading) isLoading: any;
  @select((s) => s.locations.locationList) locationList$: any;
  @select((s) => s.locations.isLoading) islocationsLoading: any;
  @select((s) => s.spokenLanguages.spokenLanguageList) spokenLanguageList$: any;
  @select((s) => s.spokenLanguages.isLoading) isspokenLanguagesLoading: any;
  @select((s) => s.deals.dealDetails) dealDetails$: any;
  @select((s) => s.deals.isLoading) isdealsLoading: any;
  PostJobForm!: FormGroup;
  countryList!: Country[];
  jobTypes!: { Name: string; Value: string }[];
  spokenLanguages: any;
  skillList = ['Dynamics CRM 365', 'API'];
  subscriptions: Subscription[] = [];
  selectedSkills!: string[];
  Skills: string[] = [''];
  dealId: any;
  Subscriptions: Subscription[] = [];
  companyDetails = {
    id: null,
    name: null,
  };
  isSendingFormData = false;
  constructor(
    private _fb: FormBuilder,
    private _countrySvc: CountryListService,
    private _jobVacancyService: JobVacancyService,
    private _spokenLanguagesSvc: SpokenLanguageService,
    private _skillSvc: SkillService,
    private _locationSvc: LocationService,
    private _dealSvc: DealService,
    private _identitySvc: IdentityService,
    private _route: ActivatedRoute,
    private _jobVacancySvc: JobVacancyService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetCountryList();
    this.onGetJobTypes();
    this.onGetWorldwideSpokenLanguages();
    this.onGetAllSkills();
    this.getTestSkills();
    this.getParams();
    this._locationSvc.LoadLocations();
    this._spokenLanguagesSvc.LoadSpokenLanguages();
    this.onGetDealDetails();
    this.loggedInUserId();
  }

  buildForm() {
    this.PostJobForm = this._fb.group({
      JobTitle: ['', [Validators.required]],
      CompanyId: ['', [Validators.required]],
      JobType: ['', [Validators.required]],
      JobLocationId: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      HoursAWeek: ['', [Validators.required]],
      HourlyRate: ['', [Validators.required]],
      JobDescription: ['', [Validators.required]],
      JobExperience: ['', [Validators.required]],
      Certification: ['', [Validators.required]],
      LanguageId: ['', [Validators.required]],
      Skills: [[], Validators.required],
    });
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.dealId = params.get('dealId');
          this._dealSvc.LoadDealDetails(this.dealId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.Subscriptions.push(subscription);
  }
  onGetCountryList() {
    this.countryList = this._countrySvc.getCountryList();
  }

  onGetJobTypes() {
    this.jobTypes = this._jobVacancyService.getJobTypes();
  }

  onGetWorldwideSpokenLanguages() {
    // this.spokenLanguages =
    //   this._spokenLanguagesSvc.getWorldwideSpokenLanguages();
    this._spokenLanguagesSvc.LoadSpokenLanguages();
  }

  onGetDealDetails() {
    this.dealDetails$.subscribe({
      next: (response: any) => {
        if (response) {
          this.companyDetails.id = response?.CompanyId;
          this.companyDetails.name = response?.Companies.Name;
          this.PostJobForm.controls['CompanyId'].setValue(response?.CompanyId);
        }
      },
    });
  }

  onGetAllSkills() {
    this._skillSvc.loadAllSkills();
    this.skillsList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.skillList = response?.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  getTestSkills() {
    if (localStorage.getItem('JOB_SKILLS')) {
      let list: any = localStorage.getItem('JOB_SKILLS');
      this.selectedSkills = JSON.parse(list);
    }
  }
  testSkill() {
    localStorage.setItem('JOB_SKILLS', JSON.stringify(this.Skills));
    this.getTestSkills();
  }

  // salePerson() {
  //   let updatedBy = this._identitySvc.updatedBy();
  //
  //   return updatedBy;
  // }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }

  loggedInUserId() {
    let loggedInUserId = this._identitySvc.getLoggedInUserId();
    return loggedInUserId;
  }

  onSubmitForm() {
    // const Payload: any = {
    //   JobTitle: this.PostJobForm.value.JobTitle,
    //   JobDescription: this.PostJobForm.value.JobDescription,
    //   JobType: this.PostJobForm.value.JobType,
    //   JobLocation: this.PostJobForm.value.JobLocationId,
    //   SalaryRange: this.PostJobForm.value.JobType,
    //   StartDate: this.PostJobForm.value.StartDate,
    //   EndDate: this.PostJobForm.value.EndDate,
    //   HoursAWeek: this.PostJobForm.value.HoursAWeek,
    //   HourlyRate: this.PostJobForm.value.HourlyRate,
    //   IsClosed: false,
    //   PublishJob: false,
    //   CompanyId: this.PostJobForm.value.CompanyId,
    //   UpdatedBy: this.onGetUpdatedBy(),
    //   JobExperience: this.PostJobForm.value.JobExperience,
    //   Certification: this.PostJobForm.value.Certification,
    //   LanguageId: this.PostJobForm.value.LanguageId,
    //   LocationId: this.PostJobForm.value.JobLocationId,
    //   Skills: this.PostJobForm.value.Skills.map((skill: string) => ({
    //     SkillName: skill,
    //   }))
    // };

    const Payload = {
      JobTitle: this.PostJobForm.value.JobTitle,
      JobDescription: this.PostJobForm.value.JobDescription,
      JobType: this.PostJobForm.value.JobType,
      JobLocation: this.PostJobForm.value.JobLocationId,
      SalaryRange: '',
      JobCategory: '',
      JobEffective: '',
      StartDate: this.PostJobForm.value.StartDate,
      EndDate: this.PostJobForm.value.EndDate,
      HoursAWeek: this.PostJobForm.value.HoursAWeek,
      HourlyRate: this.PostJobForm.value.HourlyRate,
      IsClosed: false,
      JobExpire: '',
      PublishJob: false,
      Body: '',
      CompanyId: this.PostJobForm.value.CompanyId,
      UpdatedBy: '',
      Recruiter: '',
      RecruisitionStatus: '',
      JobExperience: this.PostJobForm.value.JobExperience,
      Certification: this.PostJobForm.value.Certification,
      ContactDetail: '',
      LanguageId: this.PostJobForm.value.LanguageId,
      jobQuestion: [
        {
          Question: '',
          InputType: '',
          Options: [''],
        },
      ],
      jobSkills: this.PostJobForm.value.Skills.map((skill: string) => ({
        SkillName: skill,
      })),
      interviewStages: [
        {
          InterviewName: '',
          InterviewDate: '',
        },
      ],
      LocationId: this.PostJobForm.value.JobLocationId,
      SalePerson: {
        FirstName: '',
        Lastname: '',
        PhoneNumber: '',
        Email: '',
      },
      JobVacancyLanguage: [this.PostJobForm.value.LanguageId],
      InterviewStageType: 'InternalHiring',
    };

    this.isSendingFormData = true;
    this._jobVacancySvc
      .AddNewJobVacancyForDeal(Payload, this.loggedInUserId(), this.dealId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.isSendingFormData = false;
            this.toastr.success(response?.ResponseMessage);
            this._router.navigate(['/recruiter/crm/deals', this.dealId]);
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.isSendingFormData = false;
            this.toastr.error(err?.statusText);
            this.toastr.error('Failed, try again!');
          }
        },
      });

    // this._dealSvc.UpdateJobWithDeal().subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //
    //     }
    //   },
    //   error: (err: any) => {
    //     if (err) {
    //       console.warn('Error: ', err);
    //     }
    //   },
    // });
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((s) => {
      if (!s.closed) {
        s.unsubscribe();
        console.log('Unsubscribed!!!');
      }
    });
  }
}
