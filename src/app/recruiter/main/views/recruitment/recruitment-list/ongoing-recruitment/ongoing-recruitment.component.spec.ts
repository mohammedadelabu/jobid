import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingRecruitmentComponent } from './ongoing-recruitment.component';

describe('OngoingRecruitmentComponent', () => {
  let component: OngoingRecruitmentComponent;
  let fixture: ComponentFixture<OngoingRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingRecruitmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
