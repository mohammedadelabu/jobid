import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTodosComponent } from './upcoming-todos.component';

describe('UpcomingTodosComponent', () => {
  let component: UpcomingTodosComponent;
  let fixture: ComponentFixture<UpcomingTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
