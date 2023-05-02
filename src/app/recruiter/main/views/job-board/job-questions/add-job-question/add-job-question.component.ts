import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Observable } from 'rxjs';
// import { QuestionBase } from '../model/question-base.model';

@Component({
  selector: 'app-add-job-question',
  templateUrl: './add-job-question.component.html',
  styleUrls: ['./add-job-question.component.scss'],
})
export class AddJobQuestionComponent implements OnInit {
  constructor(
    // @Inject(MAT_DIALOG_DATA)
    // public data: { jobQuestions: Observable<QuestionBase<any>[]> }
  ) {}

  ngOnInit(): void {
    // console.log('jobQuestions: ', this.data.jobQuestions);
  }
  // jobQuestions
}
