import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { UpcomingTodosComponent } from './todo-category/upcoming-todos/upcoming-todos.component';
import { CompletedTodosComponent } from './todo-category/completed-todos/completed-todos.component';
import { OverDueTodosComponent } from './todo-category/over-due-todos/over-due-todos.component';
import { CreateTodoDialogComponent } from './todo-components/create-todo-dialog/create-todo-dialog.component';
import { TodoListCardComponent } from './todo-components/todo-list-card/todo-list-card.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent,
    UpcomingTodosComponent,
    CompletedTodosComponent,
    OverDueTodosComponent,
    CreateTodoDialogComponent,
    TodoListCardComponent,
    TodoListComponent,],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TodoModule { }
