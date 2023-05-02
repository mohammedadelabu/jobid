import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRemainingHoursComponent } from './project-remaining-hours.component';

describe('ProjectRemainingHoursComponent', () => {
  let component: ProjectRemainingHoursComponent;
  let fixture: ComponentFixture<ProjectRemainingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRemainingHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRemainingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
