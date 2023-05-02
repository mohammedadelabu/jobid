import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSelectionFormComponent } from './module-selection-form.component';

describe('ModuleSelectionFormComponent', () => {
  let component: ModuleSelectionFormComponent;
  let fixture: ComponentFixture<ModuleSelectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSelectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
