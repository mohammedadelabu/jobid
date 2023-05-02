import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlacementComponent } from './create-placement.component';

describe('CreatePlacementComponent', () => {
  let component: CreatePlacementComponent;
  let fixture: ComponentFixture<CreatePlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
