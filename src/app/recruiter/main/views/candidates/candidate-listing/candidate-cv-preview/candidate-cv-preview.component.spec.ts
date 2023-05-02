import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCvPreviewComponent } from './candidate-cv-preview.component';

describe('CandidateCvPreviewComponent', () => {
  let component: CandidateCvPreviewComponent;
  let fixture: ComponentFixture<CandidateCvPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCvPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCvPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
