import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { concat, Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { Country } from 'src/app/models/types/country';
import { AddJobVacancy } from 'src/app/models/types/job';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { IdentityService } from 'src/app/services/identity.service';
import { InterviewProcessService } from 'src/app/services/interview-process.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { LocationsService } from 'src/app/services/locations.service';
import { SkillService } from 'src/app/services/skill.service';
import { SpokenLanguageService } from 'src/app/services/spoken-language.service';
import { AddInterviewProcessComponent } from './add-interview-process/add-interview-process.component';
import { AddInterviewQuestionComponent } from './add-interview-question/add-interview-question.component';

export interface JobQuestion {
  InputType: 'input' | 'multiple-option';
  Question: string;
  Options?: string[];
}

export interface QuestionDialogData {
  jobQuestions: JobQuestion[];
}

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss'],
})
export class PostJobComponent implements OnInit, OnDestroy {
  @select((s) => s.skillsList.skillsList) skillsList!: Observable<string[]>;
  @select((s) => s.skillsList.skillsList.isLoading) isLoading: any;
  @select((s) => s.company.companyListForUser) companyListForUser$: any;
  @select((s) => s.company.isLoadingCompanyListForUser)
  isCompanyListForUserLoading$: any;
  PostJobForm!: FormGroup;
  countryList!: Country[];
  jobTypes!: { Name: string; Value: string }[];
  skillList = ['Dynamics CRM 365', 'API'];
  SkillInputText: any;
  spokenLanguages!: any[];
  skillCategoryTitleList: any;
  Skills: string[] = [''];
  selectedSkills!: string[];
  InterviewProcesses: any[] = [];
  companyList: any;
  CompanyID!: string;
  CompanyContactList: any;
  UpdatedBy: any;
  userId: any;
  responseMsg: any;
  subscriptions: Subscription[] = [];
  jobQuestionsFormArray: JobQuestion[] = [];
  locations!: any[];
  minDate = new Date().toISOString().split('T')[0];
  selectedCompany!: string;
  currencies = ['$', '€'];

  skills$!: Observable<any>;
  skillsLoading = false;
  skillsInput$ = new Subject<string>();
  page = 1;
  pageSize = 10000;

  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };
  // selectedSkills_: any[] = <any>[];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter job description...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'poppins', name: 'Poppins' },
    ],
    toolbarHiddenButtons: [[], ['insertImage', 'insertVideo']],
  };
  creating = false;
  loading = false;

  constructor(
    private _countrySvc: CountryListService,
    private _spokenLanguageSvc: SpokenLanguageService,
    private _locationService: LocationsService,
    private _jobVacancyService: JobVacancyService,
    private _skillSvc: SkillService,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private _interviewProcessSvc: InterviewProcessService,
    private _companySvc: CompanyService,
    private _identitySvc: IdentityService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  get jobQuestions() {
    return this.PostJobForm.get('JobQuestions') as FormArray;
  }

  addJobQuestion() {
    this.jobQuestions.push(this._fb.control(''));
  }

  deleteJobQuestion(index: number) {
    this.jobQuestions.removeAt(index);
    this.jobQuestionsFormArray.splice(index, 1);
  }

  ngOnInit(): void {
    this.loadSkills();
    localStorage.setItem('JOB_SKILLS', JSON.stringify(this.Skills));
    this.onGetCountryList();
    this.onGetJobTypes();
    this.onGetSpokenLanguage();
    // this.onGetSkillsCategories();
    // this.getTestSkills();
    this.buildForm();
    // this.onGetinterviewProcess();
    this.onGetAllSkills();
    // this.onGetCompanyList();
    this.getCompanyListForUser();
    // this.getTheExistingProcess();
    // this.onGetUpdatedBy();
    this.onGetUserId();
    this.onGetLocations();

    let subscription = this.companyListForUser$.subscribe({
      next: (response: any) => {
        console.log('Company List for user', response);
        this.companyList = response?.Items;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onCompanyChange(e: any) {
    const companyId = e.target.value;
    const selectedCompany = this.companyList.find(
      (company: any) => company.CompanyId === companyId
    );
    this.selectedCompany = selectedCompany.Name;
    this.onGetCompanyContacts(companyId);
  }

  // onGetCompanyId() {
  //   console.log('CompanyID: ', this.CompanyID);
  //   this.onGetCompanyContacts(this.CompanyID);
  // }

  onGetUserId() {
    let user = this._identitySvc.getLoggedInUserData();
    this.userId = user.Id;
  }

  onGetCompanyContacts(CompanyId: any) {
    this.loading = true;
    let subscription = this._companySvc
      .getCompanyContacts(CompanyId)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response) {
            this.CompanyContactList = response.Data;
          }
        },
        error: (err: any) => {
          this.loading = false;
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    //
    return updatedBy;
  }

  // getTheExistingProcess() {
  //   let InterviewProcesses: any = localStorage.getItem('Interview_Processes');
  //   if (InterviewProcesses) {
  //     this.InterviewProcesses = JSON.parse(InterviewProcesses);
  //   }
  // }

  // onGetCompanyList() {
  //   let subscription = this._companySvc.getCompanyList().subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.companyList = response.Data;
  //         console.log('this.companyList: ', response);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }

  getCompanyListForUser() {
    this._companySvc.LoadCompaniesForUser(buildQueryParams(this.userQuery));
  }

  buildForm() {
    this.PostJobForm = this._fb.group({
      JobTitle: ['', Validators.required],
      JobDescription: ['', Validators.required],
      JobExperience: ['', Validators.required],
      JobType: ['', Validators.required],
      JobLocation: ['', Validators.required],
      // SalaryRange: ['', Validators.required],
      // JobCategory: ['', Validators.required],
      // JobEffective: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      HoursAWeek: ['', Validators.required],
      HourlyRate: ['', Validators.required],
      Currency: [this.currencies[0], Validators.required],
      // JobExpire: ['', Validators.required],
      // PublishJob: false,
      // Body: ['', Validators.required],
      CompanyId: ['', Validators.required],
      // UpdatedBy: ['', Validators.required],
      // Recruiter: ['', Validators.required],
      Certification: [''],
      Languages: [[], Validators.required],
      ContactDetail: ['', Validators.required],
      SalesPerson: this._fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', Validators.required],
      }),
      Skills: [[], Validators.required],
      // YearsOfExperience: '',
      // WillingToWorkRemotely: '',
      // YearsOfExperienceWithXD: '',
      JobQuestions: this._fb.array([]),
    });
  }

  get JobTitle() {
    return this.PostJobForm.get('JobTitle');
  }

  get CompanyId() {
    return this.PostJobForm.get('CompanyId');
  }

  get JobType() {
    return this.PostJobForm.get('JobType');
  }

  get JobLocation() {
    return this.PostJobForm.get('JobLocation');
  }

  get StartDate() {
    return this.PostJobForm.get('StartDate');
  }

  get EndDate() {
    return this.PostJobForm.get('EndDate');
  }

  get HoursAWeek() {
    return this.PostJobForm.get('HoursAWeek');
  }

  get HourlyRate() {
    return this.PostJobForm.get('HourlyRate');
  }

  get JobDescription() {
    return this.PostJobForm.get('JobDescription');
  }

  get JobExperience() {
    return this.PostJobForm.get('JobExperience');
  }

  get Certification() {
    return this.PostJobForm.get('Certification');
  }

  get Languages() {
    return this.PostJobForm.get('Languages')?.value;
  }

  get ContactDetail() {
    return this.PostJobForm.get('ContactDetail');
  }

  get SalesPersonFirstName() {
    return this.PostJobForm.get('SalesPerson')?.get('FirstName');
  }

  get SalesPersonLastName() {
    return this.PostJobForm.get('SalesPerson')?.get('LastName');
  }

  get SalesPersonEmail() {
    return this.PostJobForm.get('SalesPerson')?.get('Email');
  }

  get SalesPersonPhone() {
    return this.PostJobForm.get('SalesPerson')?.get('PhoneNumber');
  }

  get SelectedSkills() {
    return this.PostJobForm.get('Skills')?.value;
  }

  onGetCountryList() {
    this.countryList = this._countrySvc.getCountryList();
  }

  onGetSpokenLanguage() {
    this._spokenLanguageSvc.getSpokenLanguages().subscribe({
      next: (response) => {
        this.spokenLanguages = response.Data;
      },
      error: (err) => {
        console.warn('Error: ', err);
      },
    });
  }

  onGetLocations() {
    this._locationService.getLocations().subscribe({
      next: (response) => {
        let res = response.Data;
        let netherLands = response.Data.find(
          (location: { LocatioName: string; Id: string }) =>
            location.LocatioName === 'Netherlands'
        );
        let uk = response.Data.find(
          (location: { LocatioName: string; Id: string }) =>
            location.LocatioName === 'United Kingdom'
        );
        this.locations = [netherLands, uk].concat(
          response.Data.filter(
            (location: { LocatioName: string; Id: string }) =>
              location.LocatioName !== 'Netherlands' &&
              location.LocatioName !== 'United Kingdom'
          )
        );
        // console.log("this.locations: ",  response)
      },
      error: (err) => {
        console.warn('Error: ', err);
      },
    });
  }

  trackByFn(skill: string) {
    return skill;
  }

  // Load Skills
  private loadSkills() {
    this.skills$ = concat(
      of([]), // default items
      this.skillsInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.skillsLoading = true)),
        switchMap((term) =>
          this._skillSvc.searchJobSkills(term).pipe(
            map((res) => res.Data.map((skill) => skill.SkillName)),
            catchError(() => of([])), // empty list on error
            tap((res) => {
              this.skillsLoading = false;
              // console.log(res);
            })
          )
        )
      )
    );
  }

  onGetJobTypes() {
    this.jobTypes = this._jobVacancyService.getJobTypes();
    // console.log('this.jobTypes: ', this.jobTypes);
  }

  onGetinterviewProcess() {
    // this.InterviewProcesses = this._interviewProcessSvc.getProcess();
    // console.log('this.InterviewProcesses: ', this.InterviewProcesses);
    console.log('this.InterviewProcesses:onGetinterviewProcess()!!!! ');
    this._interviewProcessSvc.getProcess();
    let subscription = this._interviewProcessSvc
      .receiveInterviewProcessSubject()
      .subscribe({
        next: (response: any) => {
          this.InterviewProcesses = response;
          console.log(
            'this.InterviewProcesses:onGetinterviewProcess()!!!! ',
            this.InterviewProcesses
          );
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  // onDelete(ProcessId: string) {
  //   this._interviewProcessSvc.deleteProcess(ProcessId);
  // }
  onDelete(index: number) {
    this.InterviewProcesses.splice(index, 1);
  }

  onGetAllSkills() {
    this._skillSvc.loadAllSkills();
  }

  // onGetSkillsCategories() {
  //   this._skillSvc.getSkillsCategories().subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         console.log('Skills categories: ', response);
  //         this.skillCategoryTitleList = response.Data;
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  back() {
    history.back();
  }

  openInterviewDialog() {
    const dialogRef = this.dialog.open(AddInterviewProcessComponent, {
      width: '700px',
      restoreFocus: false,
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `, result);
      const newProcess = {
        ProcessName: result.get('Name').value,
        ProcessDate: result.get('DateCompleted').value,
      };
      this.InterviewProcesses.push(newProcess);
    });
    this.subscriptions.push(subscription);
  }

  openQuestionDialog() {
    const dialogRef = this.dialog.open(AddInterviewQuestionComponent, {
      width: '700px',
      restoreFocus: false,
      data: { jobQuestions: this.jobQuestionsFormArray },
    });

    const subscription = dialogRef
      .afterClosed()
      .subscribe((result: { type: 'input' | 'multiple-option'; form: any }) => {
        // console.log(`Dialog result: ${result.type}`);

        let newQuestion: JobQuestion;

        if (result.type === 'input') {
          newQuestion = {
            InputType: 'input',
            Question: result.form.get('question').value,
            Options: ['', ''],
          };
        } else {
          newQuestion = {
            InputType: 'multiple-option',
            Question: result.form.get('question').value,
            Options: result.form.get('options').value,
          };
        }

        this.jobQuestionsFormArray = [
          ...this.jobQuestionsFormArray,
          newQuestion,
        ];

        this.addJobQuestion();
      });

    this.subscriptions.push(subscription);
  }

  testSkill() {
    console.log(this.Skills);
    localStorage.setItem('JOB_SKILLS', JSON.stringify(this.Skills));
    this.getTestSkills();
  }

  getTestSkills() {
    if (localStorage.getItem('JOB_SKILLS')) {
      let list: any = localStorage.getItem('JOB_SKILLS');
      // console.log('list: ', list);
      this.selectedSkills = JSON.parse(list);
      // console.log('this.selectedSkills*********: ', this.selectedSkills);
    }
  }

  onSubmitForm() {
    // const JobPost: AddJobVacancy = {
    //   CompanyId: this.PostJobForm.value.CompanyId,
    //   JobType: this.PostJobForm.value.JobType,
    //   JobLocation: this.PostJobForm.value.JobLocation,
    //   JobTitle: this.PostJobForm.value.JobTitle,
    //   JobDescription: this.PostJobForm.value.JobDescription,
    //   SalaryRange: '',
    //   JobCategory: 'ongoing',
    //   JobEffective: this.PostJobForm.value.JobEffective,
    //   StartDate: this.PostJobForm.value.StartDate,
    //   EndDate: this.PostJobForm.value.EndDate,
    //   IsClosed: false,
    //   JobExpire: '',
    //   PublishJob: this.PostJobForm.value.PublishJob,
    //   Body: JSON.stringify(this.selectedSkills),
    //   HoursAWeek: this.PostJobForm.value.HoursAWeek,
    //   HourlyRate: this.PostJobForm.value.HourlyRate,
    //   Recruiter: this.PostJobForm.value.HourlyRate,
    //   RecruisitionStatus: 'New',
    //   UpdatedBy: this.onGetUpdatedBy(),
    // };
    let jobform = this.PostJobForm.value;
    jobform.HourlyRate =
      this.PostJobForm.value.Currency + this.PostJobForm.value.HourlyRate;
    jobform.SalaryRange = '';
    jobform.JobCategory = '';
    jobform.JobEffective = '';
    jobform.isClosed = false;
    jobform.JobExpire = '';
    jobform.PublishJob = false;
    jobform.Body = '';
    jobform.UpdatedBy = this.userId;
    jobform.Recruiter = '';
    jobform.RecruisitionStatus = '';
    jobform.LanguageId = 'd1bac05a-db74-4d65-874c-08da9655efba';
    jobform.jobQuestion = this.jobQuestionsFormArray;
    jobform.jobSkills = this.PostJobForm.value.Skills.map((skill: string) => ({
      SkillName: skill,
    }));
    jobform.interviewStages = this.InterviewProcesses.map((process) => ({
      InterviewName: process.ProcessName,
      InterviewDate: process.ProcessDate,
    }));
    jobform.LocationId = this.PostJobForm.value.JobLocation;
    jobform.SalePerson = {
      ...this.PostJobForm.value.SalesPerson,
      Lastname: this.PostJobForm.value.SalesPerson.LastName,
    };
    jobform.JobVacancyLanguage = this.PostJobForm.value.Languages;
    jobform.InterviewStageType =
      this.selectedCompany === 'Zarttech' ? 'InternalHiring' : 'ExternalHiring';

    // console.log('Job Form: ', jobform);
    this.onAddJobVacancy(jobform);
  }

  onAddJobVacancy(Job: any) {
    this.creating = true;
    let subscription = this._jobVacancyService
      .postJob(Job, this.userId)
      .subscribe({
        next: (response: any) => {
          this.creating = false;
          console.log('Job Added Response: ', response);
          if (response.ResponseCode == 200) {
            this.toastr.success('Job created successfully');
            this.responseMsg = response.ResponseMessage;
            this.PostJobForm.reset();
            // setTimeout(() => {
            this.responseMsg = '';
            this._router.navigate(['/recruiter/employee-management/job-board']);
            // }, 2500);
          } else {
            this.toastr.error('Error occurred in creating job');
          }
        },
        error: (err: any) => {
          this.creating = false;
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('JOB_SKILLS');
    localStorage.removeItem('Interview_Processes');
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
