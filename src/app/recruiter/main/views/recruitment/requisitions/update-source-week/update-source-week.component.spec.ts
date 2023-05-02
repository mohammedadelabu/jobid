import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSourceWeekComponent } from './update-source-week.component';

describe('UpdateSourceWeekComponent', () => {
  let component: UpdateSourceWeekComponent;
  let fixture: ComponentFixture<UpdateSourceWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSourceWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSourceWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
