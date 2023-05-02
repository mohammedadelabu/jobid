import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSideNavigationComponent } from './settings-side-navigation.component';

describe('SettingsSideNavigationComponent', () => {
  let component: SettingsSideNavigationComponent;
  let fixture: ComponentFixture<SettingsSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSideNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
