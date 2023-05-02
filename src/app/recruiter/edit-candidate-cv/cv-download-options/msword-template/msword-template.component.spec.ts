import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MswordTemplateComponent } from './msword-template.component';

describe('MswordTemplateComponent', () => {
  let component: MswordTemplateComponent;
  let fixture: ComponentFixture<MswordTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MswordTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
