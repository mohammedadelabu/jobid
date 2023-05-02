import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModulesComponent } from './application-modules.component';

describe('ApplicationModulesComponent', () => {
  let component: ApplicationModulesComponent;
  let fixture: ComponentFixture<ApplicationModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
