import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireChoixComponent } from './formulaire-choix.component';

describe('FormulaireChoixComponent', () => {
  let component: FormulaireChoixComponent;
  let fixture: ComponentFixture<FormulaireChoixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireChoixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
