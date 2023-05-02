import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SetTriggerComponent } from '../placement-details/set-trigger/set-trigger.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openTriggerDialog() {
    const dialogRef = this.dialog.open(SetTriggerComponent, {
      // height: '400px',
      width: '600px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('JOB_SKILLS');
    localStorage.removeItem('Interview_Processes');
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
