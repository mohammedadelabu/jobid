import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUploadDocumentDialogComponent } from './company-upload-document-dialog.component';

describe('CompanyUploadDocumentDialogComponent', () => {
  let component: CompanyUploadDocumentDialogComponent;
  let fixture: ComponentFixture<CompanyUploadDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUploadDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUploadDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
