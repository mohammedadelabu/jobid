import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-messages',
  templateUrl: './recent-messages.component.html',
  styleUrls: ['./recent-messages.component.scss']
})
export class RecentMessagesComponent implements OnInit {
  recentChats = [
    {
      id: 1,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/27.jpg',
      name: 'Annette Black',
      unread: 1,
      selected: false,
      online: true
    },
    {
      id: 2,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/42.jpg',
      name: 'Jacob Jones',
      unread: 1,
      selected: false,
      online: true
    },
    {
      id: 3,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/20.jpg',
      name: 'Devon Lane',
      unread: 0,
      selected: false,
      online: false
    },
    {
      id: 4,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/50.jpg',
      name: 'Bessie Cooper',
      unread: 0,
      selected: false,
      online: false
    },
    {
      id: 5,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/35.jpg',
      name: 'Dianne Russell',
      unread: 0,
      selected: false,
      online: false
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
