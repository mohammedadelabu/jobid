import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactListDialogComponent } from './company-contact-list-dialog.component';

describe('CompanyContactListDialogComponent', () => {
  let component: CompanyContactListDialogComponent;
  let fixture: ComponentFixture<CompanyContactListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyContactListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
