import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDropdownLinkComponent } from './navigation-dropdown-link.component';

describe('NavigationDropdownLinkComponent', () => {
  let component: NavigationDropdownLinkComponent;
  let fixture: ComponentFixture<NavigationDropdownLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationDropdownLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDropdownLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
