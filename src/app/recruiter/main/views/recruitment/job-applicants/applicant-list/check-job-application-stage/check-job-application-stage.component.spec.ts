import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckJobApplicationStageComponent } from './check-job-application-stage.component';

describe('CheckJobApplicationStageComponent', () => {
  let component: CheckJobApplicationStageComponent;
  let fixture: ComponentFixture<CheckJobApplicationStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckJobApplicationStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckJobApplicationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
