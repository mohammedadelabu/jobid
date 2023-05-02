import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IAppState } from 'src/STORE/store';
import { FETCH_TODOS, FETCH_TODOS_ERROR, FETCH_TODOS_SUCCESS } from 'src/STORE/_todo.store/todo.actions';
import { Todo } from '../models/types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = " http://localhost:3000"
  TodosUrl = this.baseUrl + '/Todos';

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  GetTodos() {
    this.ngRedux.dispatch({ type: FETCH_TODOS })
    return this._http.get(this.TodosUrl)
      .pipe(
        map((todo: any) => {
          console.log(">>>: ", todo)
          let todos = todo;
          let todosList = [];
          if (todos) {
            for (let key in todos) {
              let todo: any = {
                Id: todos[key].id,
                Title: todos[key].Title,
                DueDate: new Date(todos[key].DueDate).toLocaleString(),
                Description: todos[key].Description,
                isCompleted: todos[key].isCompleted
              };
              todosList.push({ ...todo });
            }
          }
          return todosList.reverse();

        })
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log("response: ", response)
            this.ngRedux.dispatch({ type: FETCH_TODOS_SUCCESS, payload: response })
          }
        },
        error: (err: any) => {
          console.warn("Error: ", err)
          this.ngRedux.dispatch({ type: FETCH_TODOS_ERROR, payload: err })
        }
      })
  }

  AddTodo(Todo: Todo) {
    return this._http.post(this.TodosUrl, Todo);
  }

  UpdateTodo(Todo: Todo, TodoId: string) {
    return this._http.put(`${this.TodosUrl}/${TodoId}`, Todo);
  }
}
