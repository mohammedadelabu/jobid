import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistCandidateButtonComponent } from './shortlist-candidate-button.component';

describe('ShortlistCandidateButtonComponent', () => {
  let component: ShortlistCandidateButtonComponent;
  let fixture: ComponentFixture<ShortlistCandidateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistCandidateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistCandidateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
