import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessProcessorWidgetComponent } from './process-processor-widget.component';

describe('ProcessProcessorWidgetComponent', () => {
  let component: ProcessProcessorWidgetComponent;
  let fixture: ComponentFixture<ProcessProcessorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessProcessorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessProcessorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
