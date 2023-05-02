import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCertificationComponent } from './preview-certification.component';

describe('PreviewCertificationComponent', () => {
  let component: PreviewCertificationComponent;
  let fixture: ComponentFixture<PreviewCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
