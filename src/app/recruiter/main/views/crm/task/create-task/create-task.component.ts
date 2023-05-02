import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/types/task';
import { TaskService } from 'src/app/services/task.service';
import { IAppState } from 'src/STORE/store';
import { ADD_TASK, ADD_TASK_ERROR, ADD_TASK_SUCCESS } from 'src/STORE/_task.store/tasks.actions';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  CreateTaskForm!: FormGroup;
  isSending: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _taskSvc: TaskService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private toastrSvc: ToastrService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.CreateTaskForm = this._fb.group({
      TaskName: ['', [Validators.required]],
      DueDate: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  onSubmit(CreateTaskForm: any) {
    console.group('CreateTaskForm: ', CreateTaskForm.value);
    const Payload: Task = {
      TaskName: CreateTaskForm.value.TaskName,
      Description: CreateTaskForm.value.Description,
      DueDate: CreateTaskForm.value.DueDate,
    };

    if (CreateTaskForm.invalid) {
      return;
    } else {
      this.onCreateTask(Payload);
    }
  }
  onCreateTask(Task: Task) {
    this.ngRedux.dispatch({type: ADD_TASK})
    this.isSending = true;
    this._taskSvc.AddCRMTask(Task).subscribe({
      next: (response: any) => {
        if (response) {
          this.isSending = false;
          console.log('response: ', response);
          this.toastrSvc.success('Task successfully created!');
          this.ngRedux.dispatch({type: ADD_TASK_SUCCESS, payload: Task})
          this.closeDialog();
        }
      },
      error: (err: any) => {
        if (err) {
          this.isSending = false;
          this.ngRedux.dispatch({type: ADD_TASK_ERROR, payload: err})
          this.toastrSvc.error('failed to create task, try again!');
          console.warn('Error: ', err);
        }
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
