import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { PracticeComponent } from '../practice.component';
import { PracticeRoutingModule } from './practice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from '../dynamic-forms/components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from '../dynamic-forms/components/dynamic-form/dynamic-form.component';
import { DynamicFormModule } from '../dynamic-forms/module/dynamic-form.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SocialSharingComponent } from '../social-sharing/social-sharing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

@NgModule({
  declarations: [
    DynamicFormsComponent,
    PracticeComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    SocialSharingComponent,
  ],
  imports: [
    CommonModule,
    PracticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // DynamicFormModule
    ShareButtonsModule,
    ShareIconsModule,
    SharedModule,
    NgMaterialModule
  ],
})
export class PracticeModule {}
