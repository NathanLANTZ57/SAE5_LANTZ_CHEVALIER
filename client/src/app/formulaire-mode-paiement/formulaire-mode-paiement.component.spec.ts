import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireModePaiementComponent } from './formulaire-mode-paiement.component';

describe('FormulaireModePaiementComponent', () => {
  let component: FormulaireModePaiementComponent;
  let fixture: ComponentFixture<FormulaireModePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireModePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireModePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
