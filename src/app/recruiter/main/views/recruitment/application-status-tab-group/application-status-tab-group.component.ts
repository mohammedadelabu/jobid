import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-application-status-tab-group',
  templateUrl: './application-status-tab-group.component.html',
  styleUrls: ['./application-status-tab-group.component.scss'],
})
export class ApplicationStatusTabGroupComponent implements OnInit, OnDestroy {
  tabs = ['applicants', 'shortlisted', 'hired', 'rejected'];

  vacancyId!: string;
  companyId!: string;
  subscriptions: Subscription[] = [];
  activeTab = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _jobApplicationSvc: JobApplicationService
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  clicked(event: any) {
    this.activeTab = event.index;
    this._router.navigate(
      [
        `recruiter/employee-management/recruitment/job-applicants/${
          this.vacancyId
        }/${this.companyId}/${event.index === 0 ? '' : this.tabs[event.index]}`,
      ],
      { queryParams: { vacancyId: this.vacancyId } }
    );
    console.log('Working');
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
        // this.onGetCompanyProcesses(this.vacancyId);
        // this.onGetVacancyInformation(this.companyId);
        // this.onGetCompanyDetails(this.companyId);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
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
