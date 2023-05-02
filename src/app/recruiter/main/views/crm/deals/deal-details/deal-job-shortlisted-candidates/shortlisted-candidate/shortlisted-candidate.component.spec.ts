import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedCandidateComponent } from './shortlisted-candidate.component';

describe('ShortlistedCandidateComponent', () => {
  let component: ShortlistedCandidateComponent;
  let fixture: ComponentFixture<ShortlistedCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistedCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
