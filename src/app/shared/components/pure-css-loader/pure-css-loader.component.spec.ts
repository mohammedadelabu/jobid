import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PureCssLoaderComponent } from './pure-css-loader.component';

describe('PureCssLoaderComponent', () => {
  let component: PureCssLoaderComponent;
  let fixture: ComponentFixture<PureCssLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PureCssLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PureCssLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
