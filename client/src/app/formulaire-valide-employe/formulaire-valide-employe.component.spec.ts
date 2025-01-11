import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireValideEmployeComponent } from './formulaire-valide-employe.component';

describe('FormulaireValideEmployeComponent', () => {
  let component: FormulaireValideEmployeComponent;
  let fixture: ComponentFixture<FormulaireValideEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireValideEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireValideEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
