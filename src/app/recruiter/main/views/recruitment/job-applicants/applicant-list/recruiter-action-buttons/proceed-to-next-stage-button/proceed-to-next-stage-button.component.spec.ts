import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedToNextStageButtonComponent } from './proceed-to-next-stage-button.component';

describe('ProceedToNextStageButtonComponent', () => {
  let component: ProceedToNextStageButtonComponent;
  let fixture: ComponentFixture<ProceedToNextStageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedToNextStageButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedToNextStageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
