import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { CompanyProcessService } from 'src/app/services/company-process.service';
import { CompanyService } from 'src/app/services/company.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { environment } from 'src/environments/environment';
import { ApplyForJobComponent } from '../../job-board/job-details/apply-for-job/apply-for-job.component';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss'],
})
export class JobApplicantsComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  vacancyId: any;
  applicantList: any;
  companyId: any;
  // JobVacancyDetails: any;
  CompanyDetails: any;
  VacancyInformation: any;
  CompanyProcesses: any;
  ZarttechProcesses: any;
  VacancyProcess: any;
  companyContact: any;
  firstProcess: any;
  updatedBy: any;
  subscriptions: Subscription[] = [];
  Applicants: any;
  userQuery: QueryParamsModel = {
    Status: '',
  };
  noRejected = new BehaviorSubject(0);
  noShortlisted = new BehaviorSubject(0);
  isLoading = false;

  constructor(
    private _route: ActivatedRoute,
    private _jobApplicationSvc: JobApplicationService,
    private _jobVacancSvc: JobVacancyService,
    private _companySvc: CompanyService,
    // private _companyProcessSvc: CompanyProcessService,
    private _vacancyProcessSvc: VacancyProcessService,
    public dialog: MatDialog,
    private _messengerSvc: MessengerService,
    private _jobApplicationStageSvc: JobApplicationStageService,
    private _identitySvc: IdentityService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  // ngOnInit(): void {
  // }

  ngOnInit(): void {
    this.getParams();
    this.getJobApplicants();
    // this.onGetJobApplicants();
    // this.onGetAllVacancyList();
    this.onGetJobVacancyById();
    this.onGetZarttechProcesses();

    let subscription = this.jobDetails$.subscribe({
      next: (response: any) => {
        this.VacancyInformation = response;
        this.onGetCompanyContactPerson(
          this.VacancyInformation?.Company.CompanyId
        );
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription);

    let subscription2 = this.noRejected.subscribe({
      next: (res) => {
        if (
          res === this?.Applicants?.length &&
          this?.Applicants?.length !== 0
        ) {
          this.toastr.success('All applicants rejected successfully');
          this.noRejected.next(0);
        }
      },
    });

    this.subscriptions.push(subscription2);

    let subscription3 = this.noShortlisted.subscribe({
      next: (res) => {
        if (
          res === this?.Applicants?.length &&
          this?.Applicants?.length !== 0
        ) {
          this.toastr.success('All applicants shortlisted successfully');
          this.noShortlisted.next(0);
        }
      },
    });

    this.subscriptions.push(subscription3);
  }

  getJobApplicants() {
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(this.userQuery)
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.Applicants = response?.Data?.Items.filter(
              (applicant: any) => !!applicant.Candidate
            );
          }
        },
        error: (err: any) => {
          console.log('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        //
        this.vacancyId = params.get('JobId');
        this.companyId = params.get('CompanyId');
        // this.companyId = params.get('CompanyId');
        // console.log('vacancyId: ', this.vacancyId);
        // console.log('companyId: ', this.companyId);
        this.onGetCompanyProcesses(this.vacancyId);
        // this.onGetVacancyInformation(this.companyId);
        // this.onGetCompanyDetails(this.companyId);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onApplyForPosition() {
    const dialogRef = this.dialog.open(ApplyForJobComponent, {
      width: '100%',
      maxWidth: '600px',
      data: {
        JobId: this.vacancyId,
      },
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  /*  */
  onGetCompanyProcesses(VacancyId: string) {
    let subscription = this._vacancyProcessSvc
      .getVacancyProcess(VacancyId)
      .subscribe({
        next: (response: any) => {
          // console.log('VacancyProcess: ', response);
          if (response.ResponseCode == '00') {
            this.VacancyProcess = response.Data;
            // console.log('VacancyProcess: ', this.VacancyProcess);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetZarttechProcesses() {
    let zarttechCompanyId = environment.internalCompanyId;
    let zarttechVacancyId = environment.internalVacancyId;
    // console.log('zarttechCompanyId: ', zarttechCompanyId);
    // console.log('zarttechVacancyId: ', zarttechVacancyId);
    let subscription = this._vacancyProcessSvc
      .getVacancyProcess(zarttechVacancyId)
      .subscribe({
        next: (response: any) => {
          // console.log('ZarttechProcesses: ', response);
          if (response.ResponseCode == '00') {
            this.ZarttechProcesses = response.Data;
            // console.log('ZarttechProcesses: ', this.ZarttechProcesses);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  /* */

  onGetVacancyInformation(CompanyId: string) {
    let subscription = this._jobVacancSvc
      .getJobVacanciesByCompany(CompanyId)
      .subscribe({
        next: (response: any) => {
          // console.log('JobVacanciesByCompany: ', response);
          if (response.ResponseCode == '00') {
            // this.JobVacancyDetails = response.Data[0];
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetCompanyDetails(CompanyId: string) {
    let subscription = this._companySvc.getCompanyDetails(CompanyId).subscribe({
      next: (response: any) => {
        if (response.ResponseCode == '00') {
          // console.log(' this.onGetCompanyDetails(): ', response);
          this.CompanyDetails = response?.Data;
        }
      },
      error: (err: any) => {},
    });
    this.subscriptions.push(subscription);
  }

  onGetCompanyContactPerson(CompanyId: string) {
    let subscription = this._companySvc
      .getCompanyContacts(CompanyId)
      .subscribe({
        next: (response: any) => {
          if (response.ResponseCode == '00') {
            // console.log(' this.onGetCompanyContactPerson(): ', response);
            this.companyContact = response?.Data[0];
          }
        },
        error: (err: any) => {},
      });
    this.subscriptions.push(subscription);
  }

  // onGetAllVacancyList() {
  //   let subscription = this._jobVacancSvc.getJobVacancies().subscribe({
  //     next: (response: any) => {
  //       if (response.ResponseCode == '00') {
  //         // console.log('All Job Vacancies: ', response);
  //         let VacancyInformation = response?.Data.filter(
  //           (vacancy: any) => vacancy.Id == this.vacancyId
  //         );
  //         this.VacancyInformation = VacancyInformation[0];
  //         // console.log('this.VacancyInformation: ', this.VacancyInformation);
  //         this.onGetCompanyContactPerson(
  //           this.VacancyInformation?.Company.CompanyId
  //         );
  //       }
  //     },
  //     error: (err: any) => {
  //
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }

  onGetJobVacancyById() {
    this._jobVacancSvc.getJobVacancyById(this.vacancyId);
  }

  // onGetJobApplicants() {
  //   let subscription = this._jobApplicationSvc
  //     .GetAllJobApplicationsForVacancy(this.vacancyId)
  //     .subscribe({
  //       next: (response: any) => {
  //         // console.log(' this.onGetJobApplicants(): ', response);
  //         this.applicantList = response?.Data;
  //         // console.log(
  //         //   ' this.onGetJobApplicants() this.applicantList: ',
  //         //   this.applicantList
  //         // );
  //       },
  //       error: (err: any) => {
  //         console.log('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onRejectAllApplicants() {
    for (let application of this.Applicants) {
      this.rejectApplication(application);
    }
  }

  onShortlistAllApplicants() {
    for (let application of this.Applicants) {
      this.shortlistApplication(application);
    }
  }

  rejectApplication(application: any) {
    this.isLoading = true;
    // console.log('Shortlist: ', application);
    // console.log('this.application: ', this.application);
    const Payload = {
      status: 'Rejected',
      applicationID: application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    // console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response) {
            const prevValue = this.noRejected.value;
            this.noRejected.next(prevValue + 1);
            // this._messengerSvc.sendSubject('Application rejected!');
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'application rejected!'
            );
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  shortlistApplication(application: any) {
    this.isLoading = true;
    // console.log('Shortlist: ', application);
    // console.log('this.application: ', this.application);
    const Payload = {
      status: 'Shortlisted',
      applicationID: application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    // console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response) {
            const prevValue = this.noShortlisted.value;
            this.noShortlisted.next(prevValue + 1);
            // this._messengerSvc.sendSubject('Application rejected!');
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'application shortlisted!'
            );
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  back() {
    // history.back();
    this._router.navigate(['/recruiter/employee-management/recruitment']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
