import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewProcessComponent } from './add-interview-process.component';

describe('AddInterviewProcessComponent', () => {
  let component: AddInterviewProcessComponent;
  let fixture: ComponentFixture<AddInterviewProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterviewProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
