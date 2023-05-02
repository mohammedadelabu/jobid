import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLeadEmailMessageFormDialogComponent } from './send-lead-email-message-form-dialog.component';

describe('SendLeadEmailMessageFormDialogComponent', () => {
  let component: SendLeadEmailMessageFormDialogComponent;
  let fixture: ComponentFixture<SendLeadEmailMessageFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendLeadEmailMessageFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendLeadEmailMessageFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
