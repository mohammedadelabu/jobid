import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-recruiter-scorecard',
  templateUrl: './recruiter-scorecard.component.html',
  styleUrls: ['./recruiter-scorecard.component.scss'],
})
export class RecruiterScorecardComponent implements OnInit {
  application: any;
  TechnicalCompetenceForm!: FormGroup;
  finalScore: number = 0;
  score!: number;
  today = new Date().toISOString();
  subscriptions: Subscription[] = [];
  isLoading = false;
  scorecardDetails = [];

  constructor(
    private _fb: FormBuilder,
    private jobAppStage: JobApplicationStageService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    private _jobApplicationSvc: JobApplicationService
  ) {}

  summaryComment = '';
  interviewerName = '';
  interviewerSignature = '';
  recommended = false;
  kiv = false;
  nr = false;

  onChange(event: any) {
    let val = event?.target.value;
    if (val === 'recommended') {
      if (this.recommended === false) {
        this.kiv = false;
        this.nr = false;
      }
      this.recommended = !this.recommended;
    }
    if (val === 'KIV') {
      if (this.kiv === false) {
        this.recommended = false;
        this.nr = false;
      }
      this.kiv = !this.kiv;
    }
    if (val === 'NR') {
      if (this.nr === false) {
        this.kiv = false;
        this.recommended = false;
      }
      this.nr = !this.nr;
    }
  }

  questionsArray = [
    {
      title: 'Programming Languages Experience',
      text: 'Is the candidate familiar with the top programming languages? What is his/her favorite programming language? JavaScript, Swift, Java, C/C++, Python, PHP, Ruby, C#, Rust (Circle the ones the candidate is proficient in)',
    },
    {
      title: 'Intelligence',
      text: "Consider the candidate's external demonstration of intelligence. Does he or she appear to grasp concepts easily? Is he or she a good listener? Does the candidate ask thoughtful and intelligent questions!",
    },
    {
      title: 'Communication',
      text: 'Can the developer communicate with their peers, and clients in a clear and effective manner so that there are no misunderstandings between parties? Is he/she able to explain and describe technical terms and processes to a non-expert?',
    },
    {
      title: 'Adaptability',
      text: 'Can the developer easily adjust to evolving changes within the company and team, as well as in processes and project tasks. Is he or she open to learning new skills to be up-to-speed with recent technology?',
    },
    {
      title: 'Leadership Skills',
      text: 'Did the candidate demonstrate, through their answers, skills required to engage, align, inspire, and move people to act?',
    },
    {
      title: 'Problem-Solving Skill',
      text: 'Can the candidate take the interviewer through a step-by-step process of designing scalable applications, know how to create software products and also look for solutions?',
    },
    {
      title: 'Intellectual Capacity/Code Philosophy',
      text: "Does the candidate know the principles of great software engineering? In the candidate's opinion, what are these principles?",
    },
    {
      title: 'Teamwork',
      text: "Can the developer be approachable in a work environment that's focused on collaboration between team members and clients which is crucial to the success and growth of the company? Has he/she ever worked as part of a team? What were his/her contributions to the teams efforts?",
    },
    {
      title: 'Responses',
      text: "Consider the candidate's response to questions asked. Are his/her responses appropriate? Did he/she answer the questions asked? Did he/she ask relevant questions?",
    },
  ];

  ngOnInit(): void {
    this.buildForm();
    this._route.paramMap.subscribe({
      next: (params) => {
        const applicantId: any = params.get('applicantId');
        const vacancyId: any = params.get('vacancyId');
        this.getApplication(vacancyId, applicantId);
      },
    });
  }

  getApplication(vacancyId: string, candidateId: string) {
    this.isLoading = true;
    let subscription = this._jobApplicationSvc
      .GetJobApplicationsForVacancyByCandidateId(vacancyId, candidateId)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.application = response?.Data;
          this.getUserScoreCard(this.application);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  // ngOnInit(): void {
  //   this.buildForm();
  //   this.getUserScoreCard();
  //   console.log('Application', this?.application);
  //   // var check = document.querySelectorAll('.check');
  //   // console.log('check: ', check);
  //   // for (let i = 0; i < check.length; i++) {
  //   //   check[i].addEventListener('change', () => {
  //   //     this.onCalc();
  //   //     console.log('hello');
  //   //   });
  //   // }

  //   // console.log(
  //   //   'Key properties: ',
  //   //   Object.keys(this.TechnicalCompetenceForm.value).length
  //   // );

  //   // console.log(this.TechnicalCompetenceForm.controls);
  // }

  getUserScoreCard(application: any) {
    let subscription = this.jobAppStage
      .GetUserScoreCard(
        application?.CandidateId,
        application?.VacancyId,
        application?.Id,
        'RecruiterEvaluationCard'
      )
      .subscribe({
        next: (response: any) => {
          console.log('Score card details', response.Data);
          this.scorecardDetails = response?.Data.scoreCards;
          this.score = +response?.Data.ScoreSummary.Score;
          this.recommended = response?.Data.ScoreSummary.Recommended;
          this.kiv = response?.Data.ScoreSummary.Kiv;
          this.nr = response?.Data.ScoreSummary.NR;
          this.summaryComment = response?.Data.ScoreSummary.Comment;
          this.interviewerName = response?.Data.InterveiwerDetail.Name;
          this.interviewerSignature =
            response?.Data.InterveiwerDetail.Signature;
          if (this.scorecardDetails.length) {
            this.TechnicalCompetenceForm.setValue({
              entries: this.scorecardDetails.map((detail: any) => {
                return {
                  comment: detail.ScoreCardText,
                  ratings: { rating: detail.ScoreCardRating.toString() },
                };
              }),
            });
          }
        },
        error: (err) => {
          console.error('Err', err);
        },
      });

    this.subscriptions.push(subscription);
  }

  ngAfterContentChecked() {
    // var check = document.querySelectorAll('.check');
    // for (let i = 0; i < check.length; i++) {
    //   check[i].addEventListener('change', () => {
    //     this.onCalc();
    //   });
    // }
  }

  buildForm() {
    this.TechnicalCompetenceForm = this._fb.group({
      entries: this._fb.array(
        Array(this.questionsArray.length)
          .fill('_')
          .map((entry) => this.addQuestionGroup())
      ),
    });
  }

  get entries() {
    return this.TechnicalCompetenceForm.get('entries') as FormArray;
  }

  addQuestionGroup() {
    return this._fb.group({
      comment: ['', Validators.required],
      ratings: this._fb.group({ rating: ['', Validators.required] }),
    });
  }

  onCalc() {
    this.score = this.TechnicalCompetenceForm.value.entries.reduce(
      (acc: number, cum: { comment: string; ratings: { rating: string } }) =>
        acc + +cum.ratings.rating,
      0
    );
  }

  onSubmit() {
    console.log(
      'RecruiterCompetenceForm: ',
      this.TechnicalCompetenceForm.value
    );
    const payload = {
      JobApplicationId: this.application.Id,
      ApplicantId: this.application.CandidateId,
      ScoreCardType: 'RecruiterEvaluationCard',
      ScoreCards: this.TechnicalCompetenceForm.value.entries.map(
        (entry: any, i: number) => {
          return {
            ScoreCardText: entry.comment,
            ScoreCardRating: +entry.ratings.rating,
            Comment: this.questionsArray[i].title,
            ScoreNumber: i,
            VacancyId: this.application.VacancyId,
          };
        }
      ),
      ScoreSummary: {
        Score: this.score,
        Comment: this.summaryComment,
        Recommended: this.recommended,
        Kiv: this.kiv,
        Nr: this.nr,
      },
      InterveiwerDetail: {
        Name: this.interviewerName,
        Signature: this.interviewerSignature,
      },
    };

    this.jobAppStage
      .AddScoreCard(this.application.CandidateId, payload)
      .subscribe({
        next: (res: any) => {
          console.log('Response', res);
          if (res.Msg === 'ScoreCard Added Successfully') {
            this.toastr.success('ScoreCard Added Successfully');
            this.back();
          }
        },
        error: (err) => {
          this.toastr.error('An error occurred');
          console.error('Error', err);
        },
      });
    console.log('Payload', payload);
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
