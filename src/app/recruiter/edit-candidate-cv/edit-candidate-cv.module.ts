import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCandidateCvComponent } from './edit-candidate-cv/edit-candidate-cv.component';
import { SideNavigationComponent } from './edit-candidate-cv/main/components/side-navigation/side-navigation.component';
import { EditCandidateRoutingModule } from './edit-candidate-cv-routing.module';
import { PersonalProfileComponent } from './edit-candidate-cv/main/sections/personal-profile/personal-profile.component';
import { WorkHistoryComponent } from './edit-candidate-cv/main/sections/work-history/work-history.component';
import { EducationComponent } from './edit-candidate-cv/main/sections/education/education.component';
import { SkillsComponent } from './edit-candidate-cv/main/sections/skills/skills.component';
import { OthersComponent } from './edit-candidate-cv/main/sections/others/others.component';
import { SummaryComponent } from './edit-candidate-cv/main/sections/summary/summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EditCvToolbarComponent } from './edit-candidate-cv/main/components/edit-cv-toolbar/edit-cv-toolbar.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PreviewWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/preview-work-experience/preview-work-experience.component';
import { AddWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/add-work-experience/add-work-experience.component';
import { UpdateWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/update-work-experience/update-work-experience.component';
import { AddEducationComponent } from './edit-candidate-cv/main/sections/education/add-education/add-education.component';
import { PreviewEducationComponent } from './edit-candidate-cv/main/sections/education/preview-education/preview-education.component';
import { UpdateEducationComponent } from './edit-candidate-cv/main/sections/education/update-education/update-education.component';
import { AddSkillComponent } from './edit-candidate-cv/main/sections/skills/add-skill/add-skill.component';
import { PreviewSkillComponent } from './edit-candidate-cv/main/sections/skills/preview-skill/preview-skill.component';
import { UpdateSkillComponent } from './edit-candidate-cv/main/sections/skills/update-skill/update-skill.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsComponent } from './edit-candidate-cv/main/sections/projects/projects.component';
import { AddProjectComponent } from './edit-candidate-cv/main/sections/projects/add-project/add-project.component';
import { PreviewProjectComponent } from './edit-candidate-cv/main/sections/projects/preview-project/preview-project.component';
import { UpdateProjectComponent } from './edit-candidate-cv/main/sections/projects/update-project/update-project.component';
import { CertificationComponent } from './edit-candidate-cv/main/sections/others/certification/certification.component';
import { LanguageSpokenComponent } from './edit-candidate-cv/main/sections/others/language-spoken/language-spoken.component';
import { RecruiterOpinionComponent } from './edit-candidate-cv/main/sections/others/recruiter-opinion/recruiter-opinion.component';
import { AdminCandidateSummaryComponent } from './edit-candidate-cv/main/sections/others/admin-candidate-summary/admin-candidate-summary.component';
import { PreviewCertificationComponent } from './edit-candidate-cv/main/sections/others/certification/preview-certification/preview-certification.component';
import { AddCertificationComponent } from './edit-candidate-cv/main/sections/others/certification/add-certification/add-certification.component';
import { UpdateCertificationComponent } from './edit-candidate-cv/main/sections/others/certification/update-certification/update-certification.component';
import { AddAdminCandidateSummaryComponent } from './edit-candidate-cv/main/sections/others/admin-candidate-summary/add-admin-candidate-summary/add-admin-candidate-summary.component';
import { UpdateAdminCandidateSummaryComponent } from './edit-candidate-cv/main/sections/others/admin-candidate-summary/update-admin-candidate-summary/update-admin-candidate-summary.component';
import { PreviewAdminCandidateSummaryComponent } from './edit-candidate-cv/main/sections/others/admin-candidate-summary/preview-admin-candidate-summary/preview-admin-candidate-summary.component';
import { AddLanguageSpokenComponent } from './edit-candidate-cv/main/sections/others/language-spoken/add-language-spoken/add-language-spoken.component';
import { PreviewLanguageSpokenComponent } from './edit-candidate-cv/main/sections/others/language-spoken/preview-language-spoken/preview-language-spoken.component';
import { UpdateLanguageSpokenComponent } from './edit-candidate-cv/main/sections/others/language-spoken/update-language-spoken/update-language-spoken.component';
import { UpdateRecruiterOpinionComponent } from './edit-candidate-cv/main/sections/others/recruiter-opinion/update-recruiter-opinion/update-recruiter-opinion.component';
import { PreviewRecruiterOpinionComponent } from './edit-candidate-cv/main/sections/others/recruiter-opinion/preview-recruiter-opinion/preview-recruiter-opinion.component';
import { AddRecruiterOpinionComponent } from './edit-candidate-cv/main/sections/others/recruiter-opinion/add-recruiter-opinion/add-recruiter-opinion.component';
import { AdminResumePreviewComponent } from './edit-candidate-cv/main/sections/admin-resume-preview/admin-resume-preview.component';
import { CvDownloadOptionsComponent } from './cv-download-options/cv-download-options.component';
import { DisclosedComponent } from './cv-download-options/disclosed/disclosed.component';
import { UndisclosedComponent } from './cv-download-options/undisclosed/undisclosed.component';
// import { MswordTemplateComponent } from './cv-download-options/msword-template/msword-template.component';

@NgModule({
  declarations: [
    EditCandidateCvComponent,
    SideNavigationComponent,
    PersonalProfileComponent,
    WorkHistoryComponent,
    EducationComponent,
    SkillsComponent,
    OthersComponent,
    SummaryComponent,
    EditCvToolbarComponent,
    PreviewWorkExperienceComponent,
    AddWorkExperienceComponent,
    UpdateWorkExperienceComponent,
    AddEducationComponent,
    PreviewEducationComponent,
    UpdateEducationComponent,
    AddSkillComponent,
    PreviewSkillComponent,
    UpdateSkillComponent,
    ProjectsComponent,
    AddProjectComponent,
    PreviewProjectComponent,
    UpdateProjectComponent,
    CertificationComponent,
    LanguageSpokenComponent,
    RecruiterOpinionComponent,
    AdminCandidateSummaryComponent,
    PreviewCertificationComponent,
    AddCertificationComponent,
    UpdateCertificationComponent,
    AddAdminCandidateSummaryComponent,
    UpdateAdminCandidateSummaryComponent,
    PreviewAdminCandidateSummaryComponent,
    AddLanguageSpokenComponent,
    PreviewLanguageSpokenComponent,
    UpdateLanguageSpokenComponent,
    UpdateRecruiterOpinionComponent,
    PreviewRecruiterOpinionComponent,
    AddRecruiterOpinionComponent,
    AdminResumePreviewComponent,
    CvDownloadOptionsComponent,
    DisclosedComponent,
    UndisclosedComponent,
    // MswordTemplateComponent,
  ],
  imports: [
    CommonModule,
    EditCandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Ng2TelInputModule,
    // NgxIntlTelInputModule,
    EditorModule,
    SharedModule,
  ],
  exports: [],
})
export class EditCandidateCvModule {}
