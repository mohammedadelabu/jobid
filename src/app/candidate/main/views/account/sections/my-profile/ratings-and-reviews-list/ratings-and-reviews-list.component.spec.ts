import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsAndReviewsListComponent } from './ratings-and-reviews-list.component';

describe('RatingsAndReviewsListComponent', () => {
  let component: RatingsAndReviewsListComponent;
  let fixture: ComponentFixture<RatingsAndReviewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingsAndReviewsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsAndReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
