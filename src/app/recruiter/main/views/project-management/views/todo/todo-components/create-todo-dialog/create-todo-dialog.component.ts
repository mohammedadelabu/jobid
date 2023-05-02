import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/models/types/todo';
import { TodoService } from 'src/app/services/todo.service';
import { IAppState } from 'src/STORE/store';
import { ADD_TODO, ADD_TODO_ERROR, ADD_TODO_SUCCESS } from 'src/STORE/_todo.store/todo.actions';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss'],
})
export class CreateTodoDialogComponent implements OnInit {
  CreateTodoForm!: FormGroup;
  constructor(private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTodoDialogComponent>,
    private _todoSvc: TodoService,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.CreateTodoForm = this._fb.group({
      Title: ['', Validators.required],
      DueDate: ['', Validators.required],
      Description: '',
    });
  }

  onSubmit() {
    this.ngRedux.dispatch({ type: ADD_TODO })
    console.log("Form data: ", this.CreateTodoForm.value);
    const Payload: Todo = {
      Title: this.CreateTodoForm.value.Title,
      DueDate: this.CreateTodoForm.value.DueDate,
      Description: this.CreateTodoForm.value.Description,
      isCompleted: false
    }
    console.log("Payload: ", Payload);
    this._todoSvc.AddTodo(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          console.log("response: ", response)
          this.ngRedux.dispatch({ type: ADD_TODO_SUCCESS, payload: response });
          this.closeDialog();
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn("Error: ", err)
          this.ngRedux.dispatch({ type: ADD_TODO_ERROR, payload: err })
        }
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
