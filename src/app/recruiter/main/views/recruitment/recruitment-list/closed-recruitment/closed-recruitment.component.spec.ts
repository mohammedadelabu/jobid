import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedRecruitmentComponent } from './closed-recruitment.component';

describe('ClosedRecruitmentComponent', () => {
  let component: ClosedRecruitmentComponent;
  let fixture: ComponentFixture<ClosedRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedRecruitmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
