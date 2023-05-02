import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { SkillService } from 'src/app/services/skill.service';
import { ScheduleInterviewComponent } from 'src/app/shared/components/schedule-interview/schedule-interview.component';

@Component({
  selector: 'app-shortlist-candidates',
  templateUrl: './shortlist-candidates.component.html',
  styleUrls: ['./shortlist-candidates.component.scss'],
})
export class ShortlistCandidatesComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  page = 1;
  pageSize = 20;
  totalPosts!: number;

  JobDetails: any;
  // JobSkills: any;
  // JobLanguages: any;
  jobId!: string;
  matchedCandidatesList: any;
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  // noApplied = new BehaviorSubject(0);
  skillSets = '';
  loading = false;

  candidateProfessionGridStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#b5b5b5',
  };

  constructor(
    private _jobVacancySvc: JobVacancyService,
    private _route: ActivatedRoute,
    private _skillSvc: SkillService,
    private _dialog: MatDialog,
    private fb: FormBuilder,
    private _jobApplicationSvc: JobApplicationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.buildForm();

    let subscription = this.jobDetails$.subscribe({
      next: (response: any) => {
        // console.log('New Job Details', response.Data);
        this.JobDetails = response;
        let JobSkills = response?.jobSkills.map(
          (skill: any) => skill.SkillName
        );
        let skillsets = JobSkills?.toString();
        this.skillSets = skillsets;
        this.onGetMatchedCandidatesPaged(this.skillSets);
        // let JobLanguages = response?.jobVacancyLanguages
        //   .map((l: any) => l.Language)
        //   .join(', ');
        // this.JobSkills = JobSkills;
        // this.JobLanguages = JobLanguages;
        // console.log('Job.Skills: ', JobSkills);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
    });
  }

  get checkArray() {
    return this.form.get('checkArray') as FormArray;
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.jobId = params.get('vacancyId');
          let jobId = params.get('vacancyId');
          this.onGetJobVacancyById(jobId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  setChecked(id: string): boolean {
    return !!this.form.value.checkArray.find(
      (candidateId: string) => candidateId === id
    );
  }

  candidatesToSelect() {
    // const toStart = (page - 1) * limit;
    // const toEnd = toStart + limit;

    // clear existing form array
    while (this.checkArray.length) {
      this.checkArray.removeAt(0);
    }

    this.matchedCandidatesList.forEach((candidate: any) => {
      this.checkArray.push(new FormControl(candidate?.User?.Id));
    });
  }

  // submitForm() {
  //   console.log(this.form.value);
  // }

  applyToSelectedCandidates() {
    const selectedCandidates: string[] = this.form.value.checkArray;
    const payload: { VacancyId: string; CandidateId: string }[] =
      selectedCandidates.map((candidateId: string) => ({
        VacancyId: this.jobId,
        CandidateId: candidateId,
      }));
    this.apply(payload);
  }

  apply(payload: { VacancyId: string; CandidateId: string }[]) {
    this.loading = true;
    // console.log('CandidateId: ', CandidateId, 'JobId: ', JobId);
    // const Payload = {
    //   VacancyId: JobId,
    //   CandidateId: CandidateId,
    // };
    let subscription = this._jobApplicationSvc
      .postMultipleApplications(payload)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response.Msg === 'JobApplication Added Successfully') {
            this.toastr.success('Job Applications added');
            this.back();
          }
        },
        error: (err: any) => {
          this.loading = false;
          if (err) {
            console.warn('Error: ', err);
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  // onGetMatchedCandidates(Skillsets: string) {
  //   this.loading = true;
  //   let subscription = this._skillSvc
  //     .searchCandidatesBySkills(Skillsets)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.loading = false;
  //         if (response.Data) {
  //           let allRelatedCandidates = Array.prototype.concat.apply(
  //             [],
  //             response?.Data
  //           );
  //           this.matchedCandidatesList = allRelatedCandidates.filter(
  //             (candidate: any) => candidate?.User != null
  //           );
  //           console.log(
  //             'this.matchedCandidatesList: ',
  //             this.matchedCandidatesList
  //           );
  //         } else {
  //           this.matchedCandidatesList = [];
  //         }
  //       },
  //       error: (err: any) => {
  //         this.loading = false;
  //         console.warn('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  onGetMatchedCandidatesPaged(Skillsets: string) {
    this.loading = true;
    const userQuery: QueryParamsModel = {
      PageSize: this.pageSize,
      PageNumber: this.page,
    };
    let subscription = this._skillSvc
      .searchCandidatesBySkillsPaged(Skillsets, buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response.ResponseMessage === 'Successful') {
            this.totalPosts = response?.Data.TotalSize;
            let allRelatedCandidates = Array.prototype.concat.apply(
              [],
              response?.Data.Items
            );
            this.matchedCandidatesList = allRelatedCandidates.filter(
              (candidate: any) => candidate?.User != null
            );
            // console.log(
            //   'this.matchedCandidatesList: ',
            //   this.matchedCandidatesList
            // );
          } else {
            this.matchedCandidatesList = [];
          }
        },
        error: (err: any) => {
          this.loading = false;
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.onGetMatchedCandidatesPaged(this.skillSets);
  }

  openScheduleInterviewDialog(candidateEmail: string, candidateId: string) {
    const dialogRef = this._dialog.open(ScheduleInterviewComponent, {
      width: '700px',
      data: {
        candidateEmail: candidateEmail,
        candidateId: candidateId,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
