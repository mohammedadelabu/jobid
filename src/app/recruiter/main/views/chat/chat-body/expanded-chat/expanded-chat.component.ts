import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-expanded-chat',
  templateUrl: './expanded-chat.component.html',
  styleUrls: ['./expanded-chat.component.scss'],
})
export class ExpandedChatComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();

  chat = {
    id: 4,
    imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg',
    name: 'Wade Warren',
    unread: 1,
    selected: false,
    online: false,
    time: '6:17pm',
  };

  allChats = [
    {
      id: 1,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
      name: 'Leslie Alexander',
      unread: 2,
      selected: true,
      online: true,
      time: '6:17pm',
    },
    {
      id: 2,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/26.jpg',
      name: 'Jenny Wilson',
      unread: 1,
      selected: false,
      online: false,
      time: '6:17pm',
    },
    {
      id: 3,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/26.jpg',
      name: 'Darrell Steward',
      unread: 0,
      selected: false,
      online: false,
      time: '6:17pm',
    },
    {
      id: 4,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg',
      name: 'Wade Warren',
      unread: 3,
      selected: false,
      online: false,
      time: '6:17pm',
    },
    {
      id: 5,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/20.jpg',
      name: 'Devon Lane',
      unread: 0,
      selected: false,
      online: false,
      time: '6:17pm',
    },
    {
      id: 6,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/50.jpg',
      name: 'Bessie Cooper',
      unread: 0,
      selected: false,
      online: false,
      time: '6:17pm',
    },
    {
      id: 7,
      imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/35.jpg',
      name: 'Dianne Russell',
      unread: 0,
      selected: false,
      online: false,
      time: '6:17pm',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  onToggleCollapse() {
    this.toggle.emit();
  }
}
