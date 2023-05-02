import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLeadFormDialogComponent } from './import-lead-form-dialog.component';

describe('ImportLeadFormDialogComponent', () => {
  let component: ImportLeadFormDialogComponent;
  let fixture: ComponentFixture<ImportLeadFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLeadFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLeadFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
