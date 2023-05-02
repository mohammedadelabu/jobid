import { Component, Input, OnInit } from '@angular/core';
import { RatingsReviewsService } from 'src/app/services/ratings-reviews.service';

@Component({
  selector: 'app-ratings-and-reviews-list',
  templateUrl: './ratings-and-reviews-list.component.html',
  styleUrls: ['./ratings-and-reviews-list.component.scss'],
})
export class RatingsAndReviewsListComponent implements OnInit {
  @Input() candidateId!: string;
  ratingsReviewsList: any;

  constructor(private _ratingsReviewsSvc: RatingsReviewsService) {}

  ngOnInit(): void {
    this.getReviews();

    this._ratingsReviewsSvc.RatingAndReviewSubject.subscribe({
      next: (response: any) => {
        this.getReviews();
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  getReviews() {
    this._ratingsReviewsSvc.getRatings(this.candidateId).subscribe({
      next: (response: any) => {
        if (response.ResponseCode == '00') {
          this.ratingsReviewsList = response?.Data;
          this._ratingsReviewsSvc.RatingAndReviewSubject.subscribe({
            next: (response: any) => {              
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
  }

  
}
