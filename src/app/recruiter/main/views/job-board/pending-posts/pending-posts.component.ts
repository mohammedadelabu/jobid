import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-posts',
  templateUrl: './pending-posts.component.html',
  styleUrls: ['./pending-posts.component.scss'],
})
export class PendingPostsComponent implements OnInit {
  pendingPostsList!: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
  }[];
  page: number = 1;
  itemsPerPage: number = 11;
  constructor() {}

  ngOnInit(): void {
    this.pendingPostsList = Array(10).fill({
      title: 'Full Stack Developer',
      company: 'The Walt Disney Company ',
      startDate: '12-03-2022',
      endDate: '12-03-2022',
    });
  }
}
