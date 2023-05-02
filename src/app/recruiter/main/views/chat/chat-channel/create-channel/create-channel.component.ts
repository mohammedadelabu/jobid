import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  CreateChannelForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateChannelComponent>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.CreateChannelForm = this._fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  openAddTeammatesDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(AddTeammatesComponent, {
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
