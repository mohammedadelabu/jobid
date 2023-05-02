import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit {
  collapsed = true;

  chatContent = {
    id: 1,
    imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
    name: 'Leslie Alexander',
    unread: 2,
    selected: true,
    online: true,
    content: {
      yesterday: [
        {
          id: 1,
          imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
          name: 'Leslie Alexander',
          time: '6:17pm',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. Tortor non metus et amet sagittis, et lorem nullam fames. Cursus scelerisque enim mattis in ornare sit lacinia facilisis. Quam in sit commodo mollis neque ultricies urna.r',
        },
        {
          id: 4,
          imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg',
          name: 'Wade Warren',
          time: '6:17pm',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. Tortor non metus et amet sagittis, et lorem nullam fames.',
        },
      ],
      today: [
        {
          id: 1,
          imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
          name: 'Leslie Alexander',
          time: '6:17pm',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. ',
        },
        {
          id: 1,
          imgUrl: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg',
          name: 'Leslie Alexander',
          time: '6:17pm',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. ',
        },
      ],
    },
  };

  parsedContent: any;

  constructor() {}

  ngOnInit(): void {
    this.parsedContent = Object.entries(this.chatContent.content);
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
