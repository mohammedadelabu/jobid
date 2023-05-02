import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsCountComponent } from './stars-count.component';

describe('StarsCountComponent', () => {
  let component: StarsCountComponent;
  let fixture: ComponentFixture<StarsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
