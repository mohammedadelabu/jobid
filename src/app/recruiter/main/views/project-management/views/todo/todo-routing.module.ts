import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTodosComponent } from './todo-category/completed-todos/completed-todos.component';
import { OverDueTodosComponent } from './todo-category/over-due-todos/over-due-todos.component';
import { UpcomingTodosComponent } from './todo-category/upcoming-todos/upcoming-todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    path: "", component: TodoListComponent,
    children: [
      { path: "upcoming", component: UpcomingTodosComponent },
      { path: "completed", component: CompletedTodosComponent },
      { path: "over-due", component: OverDueTodosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
