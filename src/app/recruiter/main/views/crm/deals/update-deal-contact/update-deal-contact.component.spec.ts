import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealContactComponent } from './update-deal-contact.component';

describe('UpdateDealContactComponent', () => {
  let component: UpdateDealContactComponent;
  let fixture: ComponentFixture<UpdateDealContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDealContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDealContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
