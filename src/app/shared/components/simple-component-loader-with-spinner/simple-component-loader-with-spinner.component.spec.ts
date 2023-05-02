import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComponentLoaderWithSpinnerComponent } from './simple-component-loader-with-spinner.component';

describe('SimpleComponentLoaderWithSpinnerComponent', () => {
  let component: SimpleComponentLoaderWithSpinnerComponent;
  let fixture: ComponentFixture<SimpleComponentLoaderWithSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleComponentLoaderWithSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponentLoaderWithSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
