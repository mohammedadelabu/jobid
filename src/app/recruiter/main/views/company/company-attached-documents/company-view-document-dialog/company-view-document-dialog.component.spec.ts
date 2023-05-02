import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewDocumentDialogComponent } from './company-view-document-dialog.component';

describe('CompanyViewDocumentDialogComponent', () => {
  let component: CompanyViewDocumentDialogComponent;
  let fixture: ComponentFixture<CompanyViewDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
