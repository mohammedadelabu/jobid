import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosedComponent } from './disclosed.component';

describe('DisclosedComponent', () => {
  let component: DisclosedComponent;
  let fixture: ComponentFixture<DisclosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisclosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
