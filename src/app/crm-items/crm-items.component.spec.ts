import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmItemsComponent } from './crm-items.component';

describe('CrmItemsComponent', () => {
  let component: CrmItemsComponent;
  let fixture: ComponentFixture<CrmItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
