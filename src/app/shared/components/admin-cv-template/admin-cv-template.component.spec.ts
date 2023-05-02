import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCvTemplateComponent } from './admin-cv-template.component';

describe('AdminCvTemplateComponent', () => {
  let component: AdminCvTemplateComponent;
  let fixture: ComponentFixture<AdminCvTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCvTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCvTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
