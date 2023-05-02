import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireApplicationButtonComponent } from './hire-application-button.component';

describe('HireApplicationButtonComponent', () => {
  let component: HireApplicationButtonComponent;
  let fixture: ComponentFixture<HireApplicationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireApplicationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireApplicationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
