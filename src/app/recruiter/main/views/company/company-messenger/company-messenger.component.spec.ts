import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMessengerComponent } from './company-messenger.component';

describe('CompanyMessengerComponent', () => {
  let component: CompanyMessengerComponent;
  let fixture: ComponentFixture<CompanyMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
