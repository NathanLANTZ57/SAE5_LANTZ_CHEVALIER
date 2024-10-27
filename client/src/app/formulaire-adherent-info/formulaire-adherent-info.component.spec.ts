import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAdherentInfoComponent } from './formulaire-adherent-info.component';

describe('FormulaireAdherentInfoComponent', () => {
  let component: FormulaireAdherentInfoComponent;
  let fixture: ComponentFixture<FormulaireAdherentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireAdherentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireAdherentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
