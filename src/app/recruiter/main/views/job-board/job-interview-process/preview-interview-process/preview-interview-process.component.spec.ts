import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInterviewProcessComponent } from './preview-interview-process.component';

describe('PreviewInterviewProcessComponent', () => {
  let component: PreviewInterviewProcessComponent;
  let fixture: ComponentFixture<PreviewInterviewProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewInterviewProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInterviewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
