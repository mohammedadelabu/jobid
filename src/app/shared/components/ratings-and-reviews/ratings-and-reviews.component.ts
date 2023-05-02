import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { RatingsReviewsService } from 'src/app/services/ratings-reviews.service';

@Component({
  selector: 'app-ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.scss'],
})
export class RatingsAndReviewsComponent implements OnInit, OnDestroy {
  test = '0';
  ratingForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isSending = false;
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    @Inject(MAT_DIALOG_DATA) public data: { candidateId: string },
    private _ratingsReviewsSvc: RatingsReviewsService,
    public dialogRef: MatDialogRef<RatingsAndReviewsComponent>,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.ratingForm = this._fb.group({
      Rating: '',
      // Username: '',
      Comment: '',
    });
  }

  // onGetUpdatedBy() {
  //   let updatedBy = this._identitySvc.updatedBy();
  //   
  //   return updatedBy;
  // }

  onGetSenderId() {
    let loggedInUserId = this._identitySvc.getLoggedInUserId();
    console.log('loggedInUserId>>>: ', loggedInUserId);
    return loggedInUserId;
  }

  // onSubmit(ratingForm: any) {
  //   console.log("ratingForm: ", ratingForm.value);
  //   const Payload = {Rating: this.test, Username: ratingForm.value.Username, Comment: ratingForm.value.Comment}
  // }

  onSubmit() {
    const Payload = {
      Rating: this.ratingForm.value.Rating,
      SenderId: this.onGetSenderId(),
      Comment: this.ratingForm.value.Comment,
      candidateId: this.data?.candidateId,
    };
    this.isSending = true;
    
    let subscription = this._ratingsReviewsSvc
      .addRatingAndComment(Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            this.ratingForm.reset();
            this._ratingsReviewsSvc.sendSubjectMessage(
              'Cadidate reviews sent!'
            );
            this.dialogRef.close('Cadidate reviews sent!');
            this._toastr.success("Cadidate reviews sent!");
            this.isSending = false;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this._toastr.error("Review failed, try again");
          this.isSending = false;
        },
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
