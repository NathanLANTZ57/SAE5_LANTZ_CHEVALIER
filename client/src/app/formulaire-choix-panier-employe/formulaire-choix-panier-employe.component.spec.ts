import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireChoixPanierEmployeComponent } from './formulaire-choix-panier-employe.component';

describe('FormulaireChoixPanierEmployeComponent', () => {
  let component: FormulaireChoixPanierEmployeComponent;
  let fixture: ComponentFixture<FormulaireChoixPanierEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireChoixPanierEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireChoixPanierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
