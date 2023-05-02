import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDealEmailMessageFormDialogComponent } from './send-deal-email-message-form-dialog.component';

describe('SendDealEmailMessageFormDialogComponent', () => {
  let component: SendDealEmailMessageFormDialogComponent;
  let fixture: ComponentFixture<SendDealEmailMessageFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendDealEmailMessageFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDealEmailMessageFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
