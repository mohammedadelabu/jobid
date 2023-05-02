import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealContactComponent } from './add-deal-contact.component';

describe('AddDealContactComponent', () => {
  let component: AddDealContactComponent;
  let fixture: ComponentFixture<AddDealContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
