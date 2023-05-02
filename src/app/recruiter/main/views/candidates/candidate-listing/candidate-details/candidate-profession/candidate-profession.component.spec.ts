import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfessionComponent } from './candidate-profession.component';

describe('CandidateProfessionComponent', () => {
  let component: CandidateProfessionComponent;
  let fixture: ComponentFixture<CandidateProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
