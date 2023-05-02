import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dd-api-sample-object-sorting',
  templateUrl: './dd-api-sample-object-sorting.component.html',
  styleUrls: ['./dd-api-sample-object-sorting.component.scss'],
})
export class DdApiSampleObjectSortingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  todo: any[] = [
    {
      title: 'Get to work',
      date: '',
      time: '',
    },
    {
      title: 'Pick up groceries',
      date: '',
      time: '',
    },
    {
      title: 'Go home',
      date: '',
      time: '',
    },
    {
      title: 'Fall asleep',
      date: '',
      time: '',
    },
  ];
  done: any[] = [
    {
      title: 'Get up',
      date: '',
      time: '',
    },
    {
      title: 'Brush teeth',
      date: '',
      time: '',
    },
    {
      title: 'Take a shower',
      date: '',
      time: '',
    },
    {
      title: 'Check e-mail',
      date: '',
      time: '',
    },
    {
      title: 'Walk dog',
      date: '',
      time: '',
    },
  ];
  DataList:any[] = [
    {
      title: 'Todo',
      listRef: 'todoList',
      connectedTo: 'doneList',
      list: this.todo
    },
    {
      title: 'Done',
      listRef: 'doneList',
      connectedTo: 'todoList',
      list: this.done
    }
  ];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
