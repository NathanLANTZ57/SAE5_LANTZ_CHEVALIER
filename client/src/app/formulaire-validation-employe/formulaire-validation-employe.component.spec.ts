import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireValidationEmployeComponent } from './formulaire-validation-employe.component';

describe('FormulaireValidationEmployeComponent', () => {
  let component: FormulaireValidationEmployeComponent;
  let fixture: ComponentFixture<FormulaireValidationEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireValidationEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireValidationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
