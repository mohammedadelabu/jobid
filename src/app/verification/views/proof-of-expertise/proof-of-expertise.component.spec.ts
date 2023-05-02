import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfExpertiseComponent } from './proof-of-expertise.component';

describe('ProofOfExpertiseComponent', () => {
  let component: ProofOfExpertiseComponent;
  let fixture: ComponentFixture<ProofOfExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofOfExpertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofOfExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
