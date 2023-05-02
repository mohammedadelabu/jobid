import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-technical-scorecard',
  templateUrl: './technical-scorecard.component.html',
  styleUrls: ['./technical-scorecard.component.scss'],
})
export class TechnicalScorecardComponent implements OnInit {
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
      title: 'Educational Background',
      text: 'Does the candidate have the required educational qualifications, training, or technical skills required for this position? If not, does he/she have a degree in a related field?',
    },
    {
      title: 'Self-Confidence',
      text: "Consider the applicant's self-confidence. Is he or she nervous and ill-at-ease or poised and relaxed? Does he/she appear to be uncertain or hesitant about his or her ideas? Observe: embarrassment, stammering, tension, poise, hesitation, lack of confidence, overconfidence.",
    },
    {
      title: 'Linkedin Alignment with CV:',
      text: 'Consider if the linkedin profile work experience aligns with what is been provided in the candidate resume. Observe stability in previous workplace, If there is a gap in the work history etc',
    },
    {
      title: 'Remote Work Exposure',
      text: "Check if the candidate has previous remote work exposure, find out if he has struggle working remotely, Check his internet stability during recruiter's interview. look out his zoom or google meet background",
    },
    {
      title: 'International Work Experience',
      text: 'Does the candidate have an international work experience either as a full time employee or as a freelancer.',
    },
    {
      title: 'Communication',
      text: 'Can the developer communicate with their peers, and clients in a clear and effective manner so that there are no misunderstandings between parties? Is he/she able to explain and describe technical terms and processes to a non-expert?',
    },
    {
      title: 'Attention To Details',
      text: 'Does the candidate know the most important things to look for when reviewing the code? What does he/she think those things are?',
    },
    {
      title: 'Executive Presence',
      text: 'Did the candidate demonstrate the necessary charisma, confidence and composure required?Observe: dress, neatness, posture, sitting position, facial expressions, and mannerisms.',
    },
    {
      title: 'Total Work Experience',
      text: 'Did the candidate have 5 years experience or above',
    },
    {
      title: 'Empathy and Relevant Experience',
      text: "Can the developer put himself in somebody else's shoes. Empathizing with the intended users of the product allows developers to see things from their point of view. Does he/she have the required relevant experience as specified in the Job Descriptions?",
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

  getUserScoreCard(application: any) {
    let subscription = this.jobAppStage
      .GetUserScoreCard(
        application?.CandidateId,
        application?.VacancyId,
        application?.Id,
        'TechnicalEvaluationScoreCard'
      )
      .subscribe({
        next: (response: any) => {
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
      'TechnicalEvaluationCompetenceForm: ',
      this.TechnicalCompetenceForm.value
    );
    const payload = {
      JobApplicationId: this.application.Id,
      ApplicantId: this.application.CandidateId,
      ScoreCardType: 'TechnicalEvaluationScoreCard',
      ScoreCards: this.TechnicalCompetenceForm.value.entries.map(
        (entry: any, i: number) => {
          return {
            ScoreCardText: entry.comment,
            ScoreCardRating: entry.ratings.rating,
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
