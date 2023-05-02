import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddDirectMessageComponent } from './add-direct-message/add-direct-message.component';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDirectMessagelDialog() {
    const dialogRef = this.dialog.open(AddDirectMessageComponent, {
      width: '500px',
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
