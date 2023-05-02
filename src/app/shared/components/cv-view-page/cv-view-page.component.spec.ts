import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewPageComponent } from './cv-view-page.component';

describe('CvViewPageComponent', () => {
  let component: CvViewPageComponent;
  let fixture: ComponentFixture<CvViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
