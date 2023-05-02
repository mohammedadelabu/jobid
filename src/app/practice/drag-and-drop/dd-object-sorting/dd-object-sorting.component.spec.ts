import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdObjectSortingComponent } from './dd-object-sorting.component';

describe('DdObjectSortingComponent', () => {
  let component: DdObjectSortingComponent;
  let fixture: ComponentFixture<DdObjectSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdObjectSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdObjectSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
