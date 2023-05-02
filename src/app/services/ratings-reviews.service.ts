import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingsReviewsService {
  RatingUrl = environment.baseUrl + 'api/Rating/';
  AddRatingUrl = this.RatingUrl + 'AddRating/';
  GetRatingsUrl = this.RatingUrl + 'GetRating/';
  UpdateRatingUrl = this.RatingUrl + 'UpdateRating/';
  RemoveRatingUrl = this.RatingUrl + 'RemoveRating/';

  RatingAndReviewSubject = new Subject();

  constructor(private _http: HttpClient) {}

  sendSubjectMessage(Msg: any) {
    this.RatingAndReviewSubject.next(Msg);
  }

  getRatings(CandidateId: string) {
    return this._http.get(`${this.GetRatingsUrl}${CandidateId}`);
  }

  getRatingsScores(CandidateId: string) {
    return this._http
      .get(`${this.GetRatingsUrl}${CandidateId}`)
      .pipe(map((data: any) => {}));
  }

  addRatingAndComment(Payload: any) {
    return this._http.post(`${this.AddRatingUrl}${Payload?.candidateId}`, {
      Rate: Payload?.Rating,
      SenderId: Payload?.SenderId,
      Comment: Payload?.Comment,
    });
  }

  removeRatingAndComment(ReviewId: string) {
    let confirmation = confirm('Are you sure you want to delete this review?');
    if (!confirmation) {
      return;
    }
    return this._http.delete(`${this.RemoveRatingUrl}${ReviewId}`);
  }
}
