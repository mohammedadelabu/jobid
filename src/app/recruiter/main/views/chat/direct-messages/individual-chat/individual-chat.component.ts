import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss'],
})
export class IndividualChatComponent implements OnInit {
  @Input() chat: any;

  constructor() {}

  ngOnInit(): void {}
}
