import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewProcessComponent } from './update-interview-process.component';

describe('UpdateInterviewProcessComponent', () => {
  let component: UpdateInterviewProcessComponent;
  let fixture: ComponentFixture<UpdateInterviewProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterviewProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterviewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
