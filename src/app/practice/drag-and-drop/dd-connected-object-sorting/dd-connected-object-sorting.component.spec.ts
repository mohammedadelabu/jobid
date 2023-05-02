import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdConnectedObjectSortingComponent } from './dd-connected-object-sorting.component';

describe('DdConnectedObjectSortingComponent', () => {
  let component: DdConnectedObjectSortingComponent;
  let fixture: ComponentFixture<DdConnectedObjectSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdConnectedObjectSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdConnectedObjectSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
