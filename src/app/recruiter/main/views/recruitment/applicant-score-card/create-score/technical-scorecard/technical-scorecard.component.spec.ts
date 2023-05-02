import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalScorecardComponent } from './technical-scorecard.component';

describe('TechnicalScorecardComponent', () => {
  let component: TechnicalScorecardComponent;
  let fixture: ComponentFixture<TechnicalScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalScorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
