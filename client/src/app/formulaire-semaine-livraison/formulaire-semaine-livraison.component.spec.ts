import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSemaineLivraisonComponent } from './formulaire-semaine-livraison.component';

describe('FormulaireSemaineLivraisonComponent', () => {
  let component: FormulaireSemaineLivraisonComponent;
  let fixture: ComponentFixture<FormulaireSemaineLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireSemaineLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireSemaineLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
