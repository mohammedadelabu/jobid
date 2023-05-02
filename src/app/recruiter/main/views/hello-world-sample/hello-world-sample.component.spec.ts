import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldSampleComponent } from './hello-world-sample.component';

describe('HelloWorldSampleComponent', () => {
  let component: HelloWorldSampleComponent;
  let fixture: ComponentFixture<HelloWorldSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloWorldSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
