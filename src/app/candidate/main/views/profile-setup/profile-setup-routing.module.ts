import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSetupComponent } from './profile-setup.component';
import { EducationComponent } from './sections/education/education.component';
import { FinishPageComponent } from './sections/finish-page/finish-page.component';
import { OthersComponent } from './sections/others/others.component';
import { PersonalProfileComponent } from './sections/personal-profile/personal-profile.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { WorkHistoryComponent } from './sections/work-history/work-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSetupComponent,
    children: [
      { path: 'personal-profile', component: PersonalProfileComponent },
      { path: 'work-history', component: WorkHistoryComponent },
      { path: 'education', component: EducationComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'others', component: OthersComponent },
      { path: 'finish', component: FinishPageComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSetupRoutingModule {}
