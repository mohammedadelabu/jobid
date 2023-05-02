import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedCandidatesComponent } from './matched-candidates.component';

describe('MatchedCandidatesComponent', () => {
  let component: MatchedCandidatesComponent;
  let fixture: ComponentFixture<MatchedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
