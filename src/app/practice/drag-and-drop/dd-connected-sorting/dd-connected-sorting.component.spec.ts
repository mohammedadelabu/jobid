import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdConnectedSortingComponent } from './dd-connected-sorting.component';

describe('DdConnectedSortingComponent', () => {
  let component: DdConnectedSortingComponent;
  let fixture: ComponentFixture<DdConnectedSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdConnectedSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdConnectedSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
