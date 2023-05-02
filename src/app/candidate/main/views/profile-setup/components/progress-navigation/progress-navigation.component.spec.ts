import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressNavigationComponent } from './progress-navigation.component';

describe('ProgressNavigationComponent', () => {
  let component: ProgressNavigationComponent;
  let fixture: ComponentFixture<ProgressNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
