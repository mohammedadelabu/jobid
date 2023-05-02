import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ProjectComponent } from './views/project/project.component';
import { TaskComponent } from './views/task/task.component';
import { TimesheetComponent } from './views/timesheet/timesheet.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from './views/todo/todo-form/todo-form.component';
import { CreateProjectFormComponent } from './views/project/create-project-form/create-project-form.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDragDropComponent } from './views/project-drag-drop/project-drag-drop.component';
import { ProjectCreateTaskComponent } from './views/project-drag-drop/project-create-task/project-create-task.component';
import { ProjectTaskDetailsComponent } from './views/project-drag-drop/project-task-details/project-task-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import { ProjectEditTaskComponent } from './views/project-drag-drop/project-edit-task/project-edit-task.component';
import { EditProjectFormComponent } from './views/project/edit-project-form/edit-project-form.component';
import { ProjectEditCategoryComponent } from './views/project-drag-drop/project-edit-category/project-edit-category.component';
import { ProjectTasksListComponent } from './views/project-drag-drop/project-tasks-list/project-tasks-list.component';
import { SideMenuComponent } from './views/project-drag-drop/side-menu/side-menu.component';
import {MatSelectModule} from '@angular/material/select';
import { ProjectAddCategoryComponent } from './views/project-drag-drop/project-add-category/project-add-category.component';
import { ProjectCommentTaskComponent } from './views/project-drag-drop/project-comment-task/project-comment-task.component';
import { ProjectHoursComponent } from './views/project/project-hours/project-hours.component';
import { ProjectRemainingHoursComponent } from './views/project/project-remaining-hours/project-remaining-hours.component';
import { AudioContextModule } from 'angular-audio-context';
@NgModule({
  declarations: [
    ProjectManagementComponent,
    CalendarComponent,
    ProjectComponent,
    TaskComponent,
    TimesheetComponent,
    TodoFormComponent,
    CreateProjectFormComponent,
    ProjectDragDropComponent,
    ProjectCreateTaskComponent,
    ProjectTaskDetailsComponent,
    ProjectEditTaskComponent,
    EditProjectFormComponent,
    ProjectEditCategoryComponent,
    ProjectTasksListComponent,
    SideMenuComponent,
    ProjectAddCategoryComponent,
    ProjectCommentTaskComponent,
    ProjectHoursComponent,
    ProjectRemainingHoursComponent,
    // UpcomingComponent,
    // CompletedComponent,
    // OverDueComponent,
    // CreateTodoDialogComponent,
    // TodoListCardComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    AudioContextModule.forRoot('balanced'),
    CommonModule,
    ProjectManagementRoutingModule,
    DragDropModule,
    MatListModule,
    MatDialogModule,
    // AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSelectModule,
    
  ],
})
export class ProjectManagementModule {}
