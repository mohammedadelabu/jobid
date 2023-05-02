import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/types/todo';
import { TodoService } from 'src/app/services/todo.service';
import { IAppState } from 'src/STORE/store';
import { UPDATE_TODO_ISCOMPLETED } from 'src/STORE/_todo.store/todo.actions';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.scss']
})
export class CompletedTodosComponent implements OnInit {

  @select((s) => s.todos.todos) todos$: any;
  @select((s) => s.todos.todosIsLoading) todosIsLoading$: any;
  todoList!: any[];


  items = [1, 2, 3];
  constructor(private _todoSvc: TodoService,
    private ngRedux: NgRedux<IAppState>) { }
  ngOnInit(): void {
    this.GetTodos();
  }

  GetTodos() {
    this._todoSvc.GetTodos();
    this.SubscribeTodo()
  }

  SubscribeTodo() {
    this.todos$.subscribe({
      next: (todos: any) => {
        if (todos) {
          console.log("todos: ", todos);
          let todoList = todos
          this.FilterTodo(todoList)
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn("Error: ", err)
        }
      }
    })
  }

  FilterTodo(TodoList: any) {
    this.todoList = TodoList.filter((t: any) => t.isCompleted === true);
  }

  UpdateIsCompleted(todo: any) {
    this.ngRedux.dispatch({ type: UPDATE_TODO_ISCOMPLETED })
    console.log("Todo: ", todo);
    const Payload: Todo = {
      Title: todo.Title,
      DueDate: todo.DueDate,
      Description: todo.Description,
      isCompleted: todo.isCompleted
    }
    console.log("Payload: ", Payload);
    this._todoSvc.UpdateTodo(Payload, todo?.Id).subscribe({
      next: (response: any) => {
        if (response) {
          console.log("response: ", response)
          this.SubscribeTodo()
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn("Error: ", err)
        }
      }
    })
  }
}
