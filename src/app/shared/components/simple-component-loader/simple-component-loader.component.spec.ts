import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComponentLoaderComponent } from './simple-component-loader.component';

describe('SimpleComponentLoaderComponent', () => {
  let component: SimpleComponentLoaderComponent;
  let fixture: ComponentFixture<SimpleComponentLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleComponentLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
