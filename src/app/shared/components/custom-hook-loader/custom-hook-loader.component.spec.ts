import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHookLoaderComponent } from './custom-hook-loader.component';

describe('CustomHookLoaderComponent', () => {
  let component: CustomHookLoaderComponent;
  let fixture: ComponentFixture<CustomHookLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomHookLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHookLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
