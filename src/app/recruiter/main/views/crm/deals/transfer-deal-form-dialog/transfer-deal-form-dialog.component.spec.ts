import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDealFormDialogComponent } from './transfer-deal-form-dialog.component';

describe('TransferDealFormDialogComponent', () => {
  let component: TransferDealFormDialogComponent;
  let fixture: ComponentFixture<TransferDealFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferDealFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDealFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
