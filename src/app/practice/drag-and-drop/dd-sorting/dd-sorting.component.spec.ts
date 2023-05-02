import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdSortingComponent } from './dd-sorting.component';

describe('DdSortingComponent', () => {
  let component: DdSortingComponent;
  let fixture: ComponentFixture<DdSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
