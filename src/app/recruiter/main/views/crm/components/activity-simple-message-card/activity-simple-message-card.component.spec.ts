import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySimpleMessageCardComponent } from './activity-simple-message-card.component';

describe('ActivitySimpleMessageCardComponent', () => {
  let component: ActivitySimpleMessageCardComponent;
  let fixture: ComponentFixture<ActivitySimpleMessageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySimpleMessageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySimpleMessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
