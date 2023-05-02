import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateTaskComponent } from './project-create-task/project-create-task.component';

import { ProjectEditCategoryComponent } from './project-edit-category/project-edit-category.component';

import { ProjectAddCategoryComponent } from './project-add-category/project-add-category.component';

import { ProjectManagementCategoryService } from 'src/app/services/project-management-category.service';

import { ProjectManagementTaskCommentService } from 'src/app/services/project-management-task-comment.service';

import { ProjectManagementTaskService } from 'src/app/services/project-management-task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from 'src/app/services/identity.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectManagementService } from 'src/app/services/project-management.service';
import { AudioContext } from 'angular-audio-context';

@Component({
  selector: 'app-project-drag-drop',
  templateUrl: './project-drag-drop.component.html',
  styleUrls: ['./project-drag-drop.component.scss'],
})
export class ProjectDragDropComponent implements OnInit {
  userId: any;
  loggedInUser: any;
  projectTaskId: any;
  categories: any;
  comments: any = [];
  updateCommentTrigger: boolean = false;

  assignees = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGa62tLVqw_JcO15Ljact1pHO9_5tH0ggvbw&usqp=CAU',

    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04ZndPl3TMJ4GMG8UeiY8XGh8ifpnPGHTbw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGa62tLVqw_JcO15Ljact1pHO9_5tH0ggvbw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzIElkzFp5UalEWNxfMYp-TgLwNCxTK_lKA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThixXO9IFNwiW0Ov8fXtKI1EfEBqH7CQiy0w&usqp=CAU',
  ];

  completed: any = [];

  workInProgress: any = [];

  readyForReview: any = [];

  underReview: any = [];
  todo: any = [];

  todos: any = [];

  todoInfo: any = {
    taskName: '',
    description: '',
    dueDate: '',
    taskAssignees: [],
  };

  commentInfo: any = {};

  projectId: any = '';
  loading: any = 'loading';
  categoryTasks: any;
  data: any = { category: {}, tasks: [] };
  categoryData: any = [];
  projectData: any = null;
  dataList: any = [];

  AddSectionForm!: FormGroup;
  AddCommentForm!: FormGroup;
  EditCommentForm!: FormGroup;

  constructor(
    private ctx: AudioContext,
    public dialog: MatDialog,
    private _projectMgmTaskService: ProjectManagementTaskService,
    private _projectMgmTaskCommentService: ProjectManagementTaskCommentService,
    private projectMgmCategoryService: ProjectManagementCategoryService,
    private _router: Router,
    private projMgmService: ProjectManagementService,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _identitySvc: IdentityService
  ) {
    this.projectId = window.location.pathname.split('/')[4];
    this.getProjectById();
    this.activatedRoute.queryParams.subscribe((params) =>
      console.log('params', params)
    );
  }

  ngOnInit(): void {
    // AudioContext = (window as any).AudioContext;
    this.getAllCategories();
    this.getLoggedUser();
    this.buildCommentForm();

    this.buildForm();
    this.displayTrigger();
    this.playAudio();
    this.initializeContext()
  }

initializeContext(){
  this.ctx = new AudioContext();
}

  playAudio() {
    try {
      let osc = this.ctx.createOscillator();
      osc.onended = () => osc.disconnect();
      osc.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch (error) {
      console.log('error', error);
    }
  }

  getTodoDetails(todo: any) {
    this.todoInfo = todo;
    this.getCommentsByTask(this.todoInfo.Id);
  }

  buildForm() {
    this.AddSectionForm = this._fb.group({
      SectionName: '',
    });

    return this.AddSectionForm;
  }

  buildCommentForm() {
    this.AddCommentForm = this._fb.group({
      Comment: '',
    });
    return this.AddCommentForm;
  }

  buildEditCommentForm() {
    this.EditCommentForm = this._fb.group({
      Comment: this.commentInfo.Comment,
    });
    return this.EditCommentForm;
  }

  onSubmitComment(taskId: any) {
    const data = {
      Comment: this.AddCommentForm.value.Comment,
      TaskId: taskId,
      UpdatedBy: this.loggedInUser.UserName,
    };

    this._projectMgmTaskCommentService
      .createProjectMgmtComment(this.loggedInUser.Id, data)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.getCommentsByTask(this.todoInfo.Id);
            this.AddCommentForm.reset();
          }
        },
        error: (err: any) => {
          // 
        },
      });
  }

  onSubmitEditComment(comment: any) {
    const data = {
      Comment: this.EditCommentForm.value.Comment,
      TaskId: comment.TaskId,
      UpdatedBy: this.loggedInUser.UserName,
    };
    this._projectMgmTaskCommentService
      .updateProjectMgmtProjectComment(data, comment.CommentId)
      .subscribe({
        next: (response: any) => {
          console.log('res', response);
          if (response.ResponseCode === '200') {
            console.log('res', response);
            this.getCommentsByTask(comment.TaskId);
            this.updateCommentTrigger = false;
          }
        },
        error: (err: any) => {
          // 
        },
      });
  }

  onEditComment(comment: any) {
    this.commentInfo = [];
    this.commentInfo = comment;
    this.updateCommentTrigger = true;
    this.buildEditCommentForm();
  }

  onDeleteComment(comment: any) {
    if (window.confirm('Are you sure')) {
      this._projectMgmTaskCommentService
        .removeProjectMgmtProjectComment(comment.CommentId)
        .subscribe({
          next: (response: any) => {
            if (response.ResponseCode === '200') {
              this.getCommentsByTask(comment.TaskId);
            }
          },
          error: (err: any) => {
            // 
          },
        });
    }
  }

  getCommentsByTask(taskId: any) {
    this._projectMgmTaskCommentService
      .getProjectMgmtCommentByTask(taskId)
      .subscribe({
        next: (response: any) => {
          this.comments = [];
          if (response.Data) {
            this.comments = response.Data;
          }
        },
        error: (err: any) => {
          // 
        },
      });
  }

  getLoggedUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectCreateTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //do something

      this.getAllCategories();
    });
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(ProjectAddCategoryComponent, {
      data: {
        ProjectId: this.projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categories = [];
      this.getAllCategories();
    });
  }

  openEditCategoryDialog(category: any) {
    const dialogRef = this.dialog.open(ProjectEditCategoryComponent, {
      height: '400px',
      width: '600px',
      data: {
        Data: category,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categories = [];
      this.getAllCategories();
    });
  }

  async playTriggerSound() {
    try {
      let audio = new Audio('../audio/apple-iphone-8.mp3');
      audio.src = '../audio/apple-iphone-8.mp3';
      audio.load();
      audio.muted = false;
      console.log('audio.play()', audio.play());
      await audio.play();
      console.log('audio.play()',audio.play())
      // const promise = await audio.play();
      // if (promise !== undefined) {
      //   audio
      //     .play()
      //     .then(() => console.log('ringing'))
      //     .catch((error) => console.log('error ==>', error));
      // }
    } catch (error) {
      console.log('errrror', error);
    }
    // audio.play()
  }

  displayTrigger() {
    setInterval(() => {
      this.initializeContext()
      const now = new Date(Date.now());
      const currentTime = `${now.getHours()}:${now.getMinutes()}`;
      console.log('currentTime', currentTime);
      const triggerTime = '17:21';
      // this.playTriggerSound();

      if (triggerTime === triggerTime) {
        console.log('trigger ringing');
        // this.playAudio();
      }
    }, 1000);
  }

  stopDisplayTrigger() {
    // clearInterval(this.displayTrigger())
  }

  getProjectById() {
    this.projMgmService.getProjectMgmtProjectById(this.projectId).subscribe({
      next: (response: any) => {
        if (response) {
          this.projectData = response.Data;
        }
      },
      error: (err: any) => {
        // console.warn('Error: ', err);
      },
    });
  }

  getAllCategories() {
    this.projectMgmCategoryService
      .getProjectMgmtCategories(this.projectId)
      .subscribe({
        next: (response: any) => {
          if (response.Data) {
            this.categories = response.Data;
            const list: any = [];
            response.Data.forEach((item: any) => {
              this._projectMgmTaskService
                .getProjectMgmtTasksByCategory(item.Id)
                .subscribe({
                  next: (catTask: any) => {
                    const catData = {
                      category: item.Name,
                      tasks: catTask.Data ? catTask.Data : [],
                    };

                    list.push(catData);
                  },
                  error: (err: any) => {
                    // 
                  },
                });
            });
            this.categoryData = list;
          }
        },
        error: (err: any) => {
          // 
        },
      });
  }

  deleteProjectCategory(categoryId: any) {
    if (window.confirm('Are you sure ?')) {
      this.projectMgmCategoryService
        .removeProjectMgmtProjectCategory(categoryId)
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.categories = [];
              this.getAllCategories();
            }
          },
          error: (err: any) => {
            // 
          },
        });
    }
  }
}
