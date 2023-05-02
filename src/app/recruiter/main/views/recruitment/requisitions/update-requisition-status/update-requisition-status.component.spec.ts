import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequisitionStatusComponent } from './update-requisition-status.component';

describe('UpdateRequisitionStatusComponent', () => {
  let component: UpdateRequisitionStatusComponent;
  let fixture: ComponentFixture<UpdateRequisitionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequisitionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequisitionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
