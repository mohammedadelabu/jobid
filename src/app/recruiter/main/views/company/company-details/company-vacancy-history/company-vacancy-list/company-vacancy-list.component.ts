import { Component, Input, OnInit } from '@angular/core';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-company-vacancy-list',
  templateUrl: './company-vacancy-list.component.html',
  styleUrls: ['./company-vacancy-list.component.scss'],
})
export class CompanyVacancyListComponent implements OnInit {
  @Input('jobVacancyList') jobVacancyList!: any;
  constructor(private _jobVacancySvc: JobVacancyService) {}

  ngOnInit(): void {
    console.log("jobVacancyList>>>: ", this.jobVacancyList)
    // this.onGetJobVacancyListForCompany(this.companyId);
  }

  // onGetJobVacancyListForCompany(CompanyId: string) {
  //   this._jobVacancySvc.getJobVacanciesByCompany(CompanyId).subscribe({
  //     next: (response: any) => {
  //       console.log('job vacancies for company: response');
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }
}
