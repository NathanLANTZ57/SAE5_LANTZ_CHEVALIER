import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireValidationComponent } from './formulaire-validation.component';

describe('FormulaireValidationComponent', () => {
  let component: FormulaireValidationComponent;
  let fixture: ComponentFixture<FormulaireValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
