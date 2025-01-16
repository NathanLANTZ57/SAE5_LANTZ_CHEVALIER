import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormulaireModeLivraisonComponent } from './formulaire-mode-livraison.component';

describe('FormulaireModeLivraisonComponent', () => {
  let component: FormulaireModeLivraisonComponent;
  let fixture: ComponentFixture<FormulaireModeLivraisonComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FormulaireModeLivraisonComponent],
      providers: [
        { provide: Router, useValue: mockRouter } 
      ]
    }).compileComponents();
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
