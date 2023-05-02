import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialogComponent } from '../todo-components/create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: "100%",
      maxWidth: "987px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
