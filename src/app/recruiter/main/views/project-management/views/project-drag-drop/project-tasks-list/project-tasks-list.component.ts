import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectManagementTaskService } from 'src/app/services/project-management-task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEditTaskComponent } from '../project-edit-task/project-edit-task.component';

@Component({
  selector: 'app-project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent implements OnInit {
  @Input('data') data: any;
  @Output() todoDetails = new EventEmitter<any>();

  todoTasks: any = [];
  todoInfo: any = {
    taskName: '',
    description: '',
    dueDate: '',
    taskAssignees: [],
  };

  constructor(
    private _projectMgmTaskService: ProjectManagementTaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProjectTasksByCategory();
  }

  getTodoDetails(value: any) {
    this.todoDetails.emit(value);
  }

  drop(event: CdkDragDrop<any[]>) {
    const status =
      event.container.element.nativeElement.parentElement?.firstChild
        ?.firstChild?.textContent;

    let element = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this._projectMgmTaskService
      .updateProjectMgmtProjectTaskCategory({
        taskId: element.Id,
        categoryId: this.data.category.Id,
      })
      .subscribe({
        next: (response: any) => {
          // task status update response when dragged and dropped
          console.log('response', response);
        },

        error: (err: any) => {
          
        },
      });
  }

  setTodoInfo(todo: any) {
    console.log('todo', todo);
    this.todoInfo = todo;
  }

  openEditDialog(task: any) {
    const dialogRef = this.dialog.open(ProjectEditTaskComponent, {
      data: {
        taskData: task,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProjectTasksByCategory();
    });
  }

  getProjectTasksByCategory(): any {
    this._projectMgmTaskService
      .getProjectMgmtTasksByCategory(this.data.category.Id)
      .subscribe({
        next: (response: any) => {
          if (response.ResponseCode === '00') {
            console.log('res todos', response.Data);
            this.todoTasks = response.Data;
          } else {
            this.todoTasks = [];
          }
        },
        error: (err: any) => {
          
        },
      });
  }

  deleteProjectTask(taskId: any) {
    if (window.confirm('Are you sure ?')) {
      this._projectMgmTaskService
        .removeProjectMgmtProjectTask(taskId)
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.getProjectTasksByCategory();
            }
          },
          error: (err: any) => {
            // 
          },
        });
    }
  }
}
