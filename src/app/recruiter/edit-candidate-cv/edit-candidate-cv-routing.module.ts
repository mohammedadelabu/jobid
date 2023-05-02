import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclosedComponent } from './cv-download-options/disclosed/disclosed.component';
import { MswordTemplateComponent } from './cv-download-options/msword-template/msword-template.component';
import { UndisclosedComponent } from './cv-download-options/undisclosed/undisclosed.component';
import { EditCandidateCvComponent } from './edit-candidate-cv/edit-candidate-cv.component';
import { AddEducationComponent } from './edit-candidate-cv/main/sections/education/add-education/add-education.component';
import { EducationComponent } from './edit-candidate-cv/main/sections/education/education.component';
import { PreviewEducationComponent } from './edit-candidate-cv/main/sections/education/preview-education/preview-education.component';
import { UpdateEducationComponent } from './edit-candidate-cv/main/sections/education/update-education/update-education.component';
import { OthersComponent } from './edit-candidate-cv/main/sections/others/others.component';
import { PersonalProfileComponent } from './edit-candidate-cv/main/sections/personal-profile/personal-profile.component';
import { AddProjectComponent } from './edit-candidate-cv/main/sections/projects/add-project/add-project.component';
import { PreviewProjectComponent } from './edit-candidate-cv/main/sections/projects/preview-project/preview-project.component';
import { ProjectsComponent } from './edit-candidate-cv/main/sections/projects/projects.component';
import { UpdateProjectComponent } from './edit-candidate-cv/main/sections/projects/update-project/update-project.component';
import { AddSkillComponent } from './edit-candidate-cv/main/sections/skills/add-skill/add-skill.component';
import { PreviewSkillComponent } from './edit-candidate-cv/main/sections/skills/preview-skill/preview-skill.component';
import { SkillsComponent } from './edit-candidate-cv/main/sections/skills/skills.component';
import { UpdateSkillComponent } from './edit-candidate-cv/main/sections/skills/update-skill/update-skill.component';
import { SummaryComponent } from './edit-candidate-cv/main/sections/summary/summary.component';
import { AddWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/add-work-experience/add-work-experience.component';
import { PreviewWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/preview-work-experience/preview-work-experience.component';
import { UpdateWorkExperienceComponent } from './edit-candidate-cv/main/sections/work-history/update-work-experience/update-work-experience.component';
import { WorkHistoryComponent } from './edit-candidate-cv/main/sections/work-history/work-history.component';

const routes: Routes = [
  {
    path: '',
    component: EditCandidateCvComponent,
    children: [
      { path: 'personal-profile', component: PersonalProfileComponent },
      {
        path: 'work-history',
        component: WorkHistoryComponent,
        children: [
          { path: '', component: PreviewWorkExperienceComponent },
          { path: 'add-experience', component: AddWorkExperienceComponent },
          {
            path: 'update-experience/:id',
            component: UpdateWorkExperienceComponent,
          },
        ],
      },
      {
        path: 'education',
        component: EducationComponent,
        children: [
          { path: '', component: PreviewEducationComponent },
          { path: 'add-education', component: AddEducationComponent },
          {
            path: 'update-education/:id',
            component: UpdateEducationComponent,
          },
        ],
      },
      {
        path: 'skills',
        component: SkillsComponent,
        children: [
          { path: '', component: PreviewSkillComponent },
          { path: 'add-skill', component: AddSkillComponent },
          {
            path: 'update-skill/:id',
            component: UpdateSkillComponent,
          },
        ],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          { path: '', component: PreviewProjectComponent },
          { path: 'add-project', component: AddProjectComponent },
          {
            path: 'update-project/:id',
            component: UpdateProjectComponent,
          },
        ],
      },
      { path: 'others', component: OthersComponent },
      { path: 'summary', component: SummaryComponent },
    ],
  },
  {path: 'view-disclosed-cv', component: DisclosedComponent},
  {path: 'view-udisclosed-cv', component: UndisclosedComponent},
  {path: 'view-msword-cv', component: MswordTemplateComponent}
  // {path: '', component: PersonalProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCandidateRoutingModule {}
