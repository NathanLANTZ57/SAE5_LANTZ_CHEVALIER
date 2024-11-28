import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireModeLivraisonComponent } from './formulaire-mode-livraison.component';

describe('FormulaireModeLivraisonComponent', () => {
  let component: FormulaireModeLivraisonComponent;
  let fixture: ComponentFixture<FormulaireModeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireModeLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
