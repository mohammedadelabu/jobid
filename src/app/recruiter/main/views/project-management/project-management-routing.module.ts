import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ProjectDragDropComponent } from './views/project-drag-drop/project-drag-drop.component';
import { ProjectTaskDetailsComponent } from './views/project-drag-drop/project-task-details/project-task-details.component';
import { ProjectComponent } from './views/project/project.component';
import { TimesheetComponent } from './views/timesheet/timesheet.component';
import { TodoComponent } from './views/todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagementComponent,
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'timesheet', component: TimesheetComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/:projectId/project-drag-drop', component: ProjectDragDropComponent },
      { path: 'project/project-drag-drop/project-task-details', component: ProjectTaskDetailsComponent },
      // { path: 'todo', component: TodoComponent },
      {
        path: 'todo',
        loadChildren: () =>
          import('./views/todo/todo.module').then(
            (m) => m.TodoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule { }
