import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-collapsed-chat',
  templateUrl: './collapsed-chat.component.html',
  styleUrls: ['./collapsed-chat.component.scss'],
})
export class CollapsedChatComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();

  chat = {
    id: 4,
    imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg',
    name: 'Wade Warren',
    unread: 0,
    selected: false,
    online: false,
  };

  constructor() {}

  ngOnInit(): void {}

  onToggleCollapse() {
    this.toggle.emit();
  }
}
