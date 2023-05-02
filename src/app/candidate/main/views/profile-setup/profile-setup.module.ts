import { NgModule } from '@angular/core';
import { ProfileSetupRoutingModule } from './profile-setup-routing.module';
import { ProfileSetupComponent } from './profile-setup.component';
import { PersonalProfileComponent } from './sections/personal-profile/personal-profile.component';
import { WorkHistoryComponent } from './sections/work-history/work-history.component';
import { EducationComponent } from './sections/education/education.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { OthersComponent } from './sections/others/others.component';
import { ProgressNavigationComponent } from './components/progress-navigation/progress-navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExperienceComponent } from './sections/work-history/add-experience/add-experience.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewExperienceComponent } from './sections/work-history/preview-experience/preview-experience.component';
import { UpdateExperienceComponent } from './sections/work-history/update-experience/update-experience.component';
import { AddEducationComponent } from './sections/education/add-education/add-education.component';
import { PreviewEducationComponent } from './sections/education/preview-education/preview-education.component';
import { UpdateEducationComponent } from './sections/education/update-education/update-education.component';
import { UpdateSkillComponent } from './sections/skills/update-skill/update-skill.component';
import { PreviewSkillComponent } from './sections/skills/preview-skill/preview-skill.component';
import { AddSkillComponent } from './sections/skills/add-skill/add-skill.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { AddProjectComponent } from './sections/projects/add-project/add-project.component';
import { PreviewProjectsComponent } from './sections/projects/preview-projects/preview-projects.component';
import { UpdateProjectComponent } from './sections/projects/update-project/update-project.component';
import { CertificationComponent } from './sections/others/certification/certification.component';
import { LanguageSpokenComponent } from './sections/others/language-spoken/language-spoken.component';
import { CandidateSummaryComponent } from './sections/others/candidate-summary/candidate-summary.component';
import { AddCertificationComponent } from './sections/others/certification/add-certification/add-certification.component';
import { AddCandidateSummaryComponent } from './sections/others/candidate-summary/add-candidate-summary/add-candidate-summary.component';
import { PreviewCertificationComponent } from './sections/others/certification/preview-certification/preview-certification.component';
import { UpdateCertificationComponent } from './sections/others/certification/update-certification/update-certification.component';
import { AddLanguageSpokenComponent } from './sections/others/language-spoken/add-language-spoken/add-language-spoken.component';
import { UpdateLanguageSpokenComponent } from './sections/others/language-spoken/update-language-spoken/update-language-spoken.component';
import { PreviewLanguageSpokenComponent } from './sections/others/language-spoken/preview-language-spoken/preview-language-spoken.component';
import { PreviewCandidateSummaryComponent } from './sections/others/candidate-summary/preview-candidate-summary/preview-candidate-summary.component';
import { UpdateCandidateSummaryComponent } from './sections/others/candidate-summary/update-candidate-summary/update-candidate-summary.component';
import { FinishPageComponent } from './sections/finish-page/finish-page.component';
import { RecruiterModule } from 'src/app/recruiter/recruiter.module';

@NgModule({
  declarations: [
    ProfileSetupComponent,
    PersonalProfileComponent,
    WorkHistoryComponent,
    EducationComponent,
    SkillsComponent,
    OthersComponent,
    ProgressNavigationComponent,
    AddExperienceComponent,
    PreviewExperienceComponent,
    UpdateExperienceComponent,
    AddEducationComponent,
    PreviewEducationComponent,
    UpdateEducationComponent,
    UpdateSkillComponent,
    PreviewSkillComponent,
    AddSkillComponent,
    ProjectsComponent,
    AddProjectComponent,
    PreviewProjectsComponent,
    UpdateProjectComponent,
    CertificationComponent,
    LanguageSpokenComponent,
    CandidateSummaryComponent,
    AddCertificationComponent,
    PreviewCertificationComponent,
    UpdateCertificationComponent,
    AddCandidateSummaryComponent,
    PreviewCandidateSummaryComponent,
    UpdateCandidateSummaryComponent,
    AddLanguageSpokenComponent,
    UpdateLanguageSpokenComponent,
    PreviewLanguageSpokenComponent,
    FinishPageComponent,
  ],
  imports: [
    CommonModule,
    ProfileSetupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule,
    RecruiterModule
  ],
})
export class ProfileSetupModule {}
