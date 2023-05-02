import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDueTodosComponent } from './over-due-todos.component';

describe('OverDueTodosComponent', () => {
  let component: OverDueTodosComponent;
  let fixture: ComponentFixture<OverDueTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverDueTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverDueTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
