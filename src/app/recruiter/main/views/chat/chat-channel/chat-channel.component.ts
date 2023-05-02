import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CreateChannelComponent } from './create-channel/create-channel.component';

@Component({
  selector: 'app-chat-channel',
  templateUrl: './chat-channel.component.html',
  styleUrls: ['./chat-channel.component.scss'],
})
export class ChatChannelComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  channels = [
    {
      id: 1,
      name: 'General',
      isLocked: false,
    },
    {
      id: 2,
      name: 'Project Team',
      isLocked: true,
    },
    {
      id: 3,
      name: 'Marketing',
      isLocked: false,
    },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateChannelDialog() {
    const dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '700px',
      restoreFocus: false,
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `, result);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
