import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEmailCardComponent } from './activity-email-card.component';

describe('ActivityEmailCardComponent', () => {
  let component: ActivityEmailCardComponent;
  let fixture: ComponentFixture<ActivityEmailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityEmailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEmailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
