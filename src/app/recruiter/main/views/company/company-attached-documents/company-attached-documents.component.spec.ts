import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAttachedDocumentsComponent } from './company-attached-documents.component';

describe('CompanyAttachedDocumentsComponent', () => {
  let component: CompanyAttachedDocumentsComponent;
  let fixture: ComponentFixture<CompanyAttachedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAttachedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAttachedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
