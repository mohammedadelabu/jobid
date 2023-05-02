import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndisclosedComponent } from './undisclosed.component';

describe('UndisclosedComponent', () => {
  let component: UndisclosedComponent;
  let fixture: ComponentFixture<UndisclosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndisclosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndisclosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
