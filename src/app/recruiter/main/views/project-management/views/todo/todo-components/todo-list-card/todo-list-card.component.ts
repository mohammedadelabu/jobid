import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component.html',
  styleUrls: ['./todo-list-card.component.scss']
})
export class TodoListCardComponent implements OnInit {
  @Input() todo: any;
  @Input() indexNumber: any;
  @Output() onUpdateIsCompleted = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  UpdateIsCompleted() {
    this.onUpdateIsCompleted.emit()
  }

}
