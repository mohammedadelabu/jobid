import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdApiSampleObjectSortingComponent } from './dd-api-sample-object-sorting.component';

describe('DdApiSampleObjectSortingComponent', () => {
  let component: DdApiSampleObjectSortingComponent;
  let fixture: ComponentFixture<DdApiSampleObjectSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdApiSampleObjectSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdApiSampleObjectSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
