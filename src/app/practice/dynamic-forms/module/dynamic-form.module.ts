import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsComponent } from '../dynamic-forms.component';
import { PracticeComponent } from '../../practice.component';
import { DynamicFormQuestionComponent } from '../components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // DynamicFormsComponent,
    // PracticeComponent,
    // DynamicFormQuestionComponent,
    // DynamicFormComponent,
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  exports: [
    // DynamicFormsComponent,
    // PracticeComponent,
    // DynamicFormQuestionComponent,
    // DynamicFormComponent,
  ],
})
export class DynamicFormModule {}
