import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RatingsReviewsService } from 'src/app/services/ratings-reviews.service';

@Component({
  selector: 'app-ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.scss'],
})
export class RatingsAndReviewsComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  ratingsReviewsList: any;
  subscriptions: Subscription[] = [];
  constructor(private _ratingsReviewsSvc: RatingsReviewsService) {}

  ngOnInit(): void {
    this.getReviews();
    let subscription = this._ratingsReviewsSvc.RatingAndReviewSubject.subscribe(
      {
        next: (response: any) => {
          
          this.getReviews();
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      }
    );
    this.subscriptions.push(subscription);
  }

  getReviews() {
    let subscription = this._ratingsReviewsSvc
      .getRatings(this.candidateId)
      .subscribe({
        next: (response: any) => {
          
          if (response.ResponseCode == '00') {
            this.ratingsReviewsList = response?.Data;
            this._ratingsReviewsSvc.RatingAndReviewSubject.subscribe({
              next: (response: any) => {
                console.warn('candidatresponseeId***==>: ', response);
                
                this.ratingsReviewsList = response?.Data;
              },
              error: (err: any) => {
                console.warn('Error: ', err);
              },
            });
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onRemoveReview(ReviewId: string) {
   let subscription:any = this._ratingsReviewsSvc.removeRatingAndComment(ReviewId)?.subscribe({
      next: (response: any) => {
        if (response) {
          
          this._ratingsReviewsSvc.sendSubjectMessage('Review deleted!');
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
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
