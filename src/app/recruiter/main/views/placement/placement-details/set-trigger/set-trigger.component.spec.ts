import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTriggerComponent } from './set-trigger.component';

describe('SetTriggerComponent', () => {
  let component: SetTriggerComponent;
  let fixture: ComponentFixture<SetTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
