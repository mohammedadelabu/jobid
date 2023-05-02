import { QuestionBase } from '../model/question-base.model';

export class QuestionDropdown extends QuestionBase<string> {
    override controlType: string = 'dropdown';
}
