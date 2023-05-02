import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionStatusButtonComponent } from './requisition-status-button.component';

describe('RequisitionStatusButtonComponent', () => {
  let component: RequisitionStatusButtonComponent;
  let fixture: ComponentFixture<RequisitionStatusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionStatusButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
