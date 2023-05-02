import { QuestionBase } from '../model/question-base.model';

export class QuestionTextBox extends QuestionBase<string> {
  override controlType: string = 'textbox';
}
