import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { select } from '@angular-redux/store';
declare var require: any;
const htmlToPdfmake = require('html-to-pdfmake');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-share-job-template',
  templateUrl: './share-job-template.component.html',
  styleUrls: ['./share-job-template.component.scss'],
})
export class ShareJobTemplateComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  JobDetails: any;
  CompanyDetails: any;
  JobSkills: any;
  JobLanguages: any;
  companyContactList: any;
  jobId: any;
  loggedInUser: any;
  companyId: any;
  @Input() events!: Observable<void>;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  subscriptions: Subscription[] = [];

  constructor(
    public _jobVacancySvc: JobVacancyService,
    private _identitySvc: IdentityService,
    private _route: ActivatedRoute,
    private _JobApplicationSvc: JobApplicationService,
    private _companySvc: CompanyService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.downloadJobVacancyAsPdf();

    let subscription = this.jobDetails$.subscribe({
      next: (response: any) => {
        this.JobDetails = response;
        let JobSkills = response?.jobSkills.map(
          (skill: any) => skill.SkillName
        );
        let JobLanguages = response?.jobVacancyLanguages
          .map((l: any) => l.Language)
          .join(', ');
        this.JobSkills = JobSkills;
        this.JobLanguages = JobLanguages;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription);
  }

  downloadJobVacancyAsPdf() {
    let subscription = this.events.subscribe(() => this.downloadAsPDF());
    this.subscriptions.push(subscription);
  }

  downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.companyId = params.get('companyId');
          this.jobId = params.get('jobId');
          let jobId = params.get('jobId');
          console.log('companyId Params: ', this.companyId);
          this.onGetJobVacancyById(jobId);
          this.onGetJobVacanciesByCompany(this.companyId, jobId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetJobVacanciesByCompany(companyId: string, jobId: string) {
    this.onGetCompanyDetails(companyId);
  }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  onGetCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '00') {
            this.CompanyDetails = response.Data;
          }
        }
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
