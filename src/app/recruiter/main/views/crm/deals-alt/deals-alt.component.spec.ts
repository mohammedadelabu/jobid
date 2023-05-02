import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsAltComponent } from './deals-alt.component';

describe('DealsAltComponent', () => {
  let component: DealsAltComponent;
  let fixture: ComponentFixture<DealsAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
