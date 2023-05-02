import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-teammates',
  templateUrl: './add-teammates.component.html',
  styleUrls: ['./add-teammates.component.scss'],
})
export class AddTeammatesComponent implements OnInit {
  teammates = [
    {
      id: 1,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
      name: 'Leslie Alexander',
      unread: 2,
      selected: true,
      online: true,
    },
    {
      id: 2,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/26.jpg',
      name: 'Jenny Wilson',
      unread: 0,
      selected: false,
      online: false,
    },
    {
      id: 3,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/26.jpg',
      name: 'Darrell Steward',
      unread: 0,
      selected: false,
      online: false,
    },
    {
      id: 4,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg',
      name: 'Wade Warren',
      unread: 0,
      selected: false,
      online: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
