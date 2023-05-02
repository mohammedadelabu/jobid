import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedApplicantsListComponent } from './placed-applicants-list.component';

describe('PlacedApplicantsListComponent', () => {
  let component: PlacedApplicantsListComponent;
  let fixture: ComponentFixture<PlacedApplicantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacedApplicantsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacedApplicantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
