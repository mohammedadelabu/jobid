import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from '../model/question-base.model';
import { QuestionDropdown } from '../question-control-type/question.dropdown';
import { QuestionTextBox } from '../question-control-type/question.textbox';

@Injectable()
export class QuestionService {
  getJobQuestionFields() {
    const question: QuestionBase<string>[] = [
      new QuestionDropdown({
        key: 'are you open to work immediately?',
        label: 'are you open to work immediately?',
        options: [
          { key: 'yes', value: 'Yes' },
          { key: 'no', value: 'No' },
        ],
        order: 1,
        required: true,
      }),
      new QuestionTextBox({
        key: 'provide your favourite javascript framework or library',
        label: 'provide your favourite javascript framework or library',
        value: '',
        order: 2,
        required: true,
      }),
    ];

    return of(question.sort((a, b) => a.order - b.order));
  }
}
