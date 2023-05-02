import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { MyProfileComponent } from './sections/my-profile/my-profile.component';
import { ApplicationsComponent } from './sections/applications/applications.component';
import { PlacementComponent } from './sections/placement/placement.component';
import { ProjectManagementComponent } from './sections/project-management/project-management.component';
import { CalendarComponent } from './sections/project-management/calendar/calendar.component';
import { TodoComponent } from './sections/project-management/todo/todo.component';
import { ProjectComponent } from './sections/project-management/project/project.component';
import { TimesheetComponent } from './sections/project-management/timesheet/timesheet.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { WorkExperienceComponent } from './sections/my-profile/work-experience/work-experience.component';
import { EducationComponent } from './sections/my-profile/education/education.component';
import { SkillsComponent } from './sections/my-profile/skills/skills.component';
import { RecruiterModule } from 'src/app/recruiter/recruiter.module';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { AccountComponent } from './account.component';
import { ApplicationHistoryComponent } from './sections/my-profile/application-history/application-history.component';
import { RatingsAndReviewsListComponent } from './sections/my-profile/ratings-and-reviews-list/ratings-and-reviews-list.component';
import { CandidatesModule } from 'src/app/recruiter/main/views/candidates/candidates.module';
import { DashboardComponent } from './sections/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AccountComponent,
    MyProfileComponent,
    ApplicationsComponent,
    PlacementComponent,
    ProjectManagementComponent,
    CalendarComponent,
    TodoComponent,
    ProjectComponent,
    TimesheetComponent,
    WorkExperienceComponent,
    EducationComponent,
    SkillsComponent,
    SideNavigationComponent,
    ApplicationHistoryComponent,
    RatingsAndReviewsListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule,
    NgMaterialModule,
    RecruiterModule,
    CandidatesModule
  ],
})
export class AccountModule {}
