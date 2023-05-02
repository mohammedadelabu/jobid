import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTaskCardComponent } from './activity-task-card.component';

describe('ActivityTaskCardComponent', () => {
  let component: ActivityTaskCardComponent;
  let fixture: ComponentFixture<ActivityTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTaskCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
