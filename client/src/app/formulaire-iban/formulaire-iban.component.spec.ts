import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireIbanComponent } from './formulaire-iban.component';

describe('FormulaireIbanComponent', () => {
  let component: FormulaireIbanComponent;
  let fixture: ComponentFixture<FormulaireIbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireIbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
