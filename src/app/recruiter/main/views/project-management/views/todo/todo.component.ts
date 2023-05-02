import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { CreateTodoDialogComponent } from './todo-components/create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList!: any[];

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: "100%",
      maxWidth: "987px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnInit(): void {
  }

}
