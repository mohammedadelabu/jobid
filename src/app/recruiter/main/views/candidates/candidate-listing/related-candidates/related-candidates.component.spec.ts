import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCandidatesComponent } from './related-candidates.component';

describe('RelatedCandidatesComponent', () => {
  let component: RelatedCandidatesComponent;
  let fixture: ComponentFixture<RelatedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
