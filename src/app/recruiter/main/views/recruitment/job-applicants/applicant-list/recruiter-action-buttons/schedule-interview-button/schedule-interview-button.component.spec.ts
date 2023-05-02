import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInterviewButtonComponent } from './schedule-interview-button.component';

describe('ScheduleInterviewButtonComponent', () => {
  let component: ScheduleInterviewButtonComponent;
  let fixture: ComponentFixture<ScheduleInterviewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInterviewButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleInterviewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
