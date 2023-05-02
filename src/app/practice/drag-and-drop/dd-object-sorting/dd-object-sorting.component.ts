import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dd-object-sorting',
  templateUrl: './dd-object-sorting.component.html',
  styleUrls: ['./dd-object-sorting.component.scss'],
})
export class DdObjectSortingComponent implements OnInit {
  movies = [
    {
      episode: 'Episode I',
      title: 'The Phantom Menace',
    },
    {
      episode: 'Episode II',
      title: 'Attack of the Clones',
    },
    {
      episode: 'Episode III',
      title: 'Revenge of the Sith',
    },
    {
      episode: 'Episode IV',
      title: 'A New Hope',
    },
    {
      episode: 'Episode V',
      title: 'The Empire Strikes Back',
    },
    {
      episode: 'Episode VI',
      title: 'Return of the Jedi',
    },
    {
      episode: 'Episode VII',
      title: 'The Force Awakens',
    },
    {
      episode: 'Episode VIII',
      title: 'The Last Jedi',
    },
    {
      episode: 'Episode IX',
      title: 'The Rise of Skywalker',
    },
    // 'Episode II - Attack of the Clones',
    // 'Episode III - Revenge of the Sith',
    // 'Episode IV - A New Hope',
    // 'Episode V - The Empire Strikes Back',
    // 'Episode VI - Return of the Jedi',
    // 'Episode VII - The Force Awakens',
    // 'Episode VIII - The Last Jedi',
    // 'Episode IX – The Rise of Skywalker',
  ];
  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
