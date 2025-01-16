import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireValidationEmployeComponent } from './formulaire-validation-employe.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeDataService } from '../shared/employe-data.service';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireValidationEmployeComponent', () => {
  let component: FormulaireValidationEmployeComponent;
  let fixture: ComponentFixture<FormulaireValidationEmployeComponent>;
  let mockEmployeDataService: any;
  let router: Router;

  beforeEach(async () => {
    mockEmployeDataService = {
      getData: jasmine.createSpy('getData').and.returnValue('Panier Solidaire')
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulaireValidationEmployeComponent, LogoComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: EmployeDataService, useValue: mockEmployeDataService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireValidationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formulePanier from EmployeDataService', () => {
    expect(mockEmployeDataService.getData).toHaveBeenCalledWith('formulePanier');
    expect(component.formulePanier).toBe('Panier Solidaire');
  });

  it('should navigate back on back button click', () => {
    spyOn(window.history, 'back');

    component.onBack();

    expect(window.history.back).toHaveBeenCalled();
  });

  it('should alert if no formulePanier is selected and next button is clicked', () => {
    spyOn(window, 'alert');

    component.formulePanier = '';
    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Aucune formule sélectionnée. Veuillez vérifier vos choix.');
  });

  it('should navigate to the next page if formulePanier is selected', () => {
    spyOn(router, 'navigate');

    component.formulePanier = 'Panier Solidaire';
    component.onNext();

    expect(router.navigate).toHaveBeenCalledWith(['/formulaire-valide-employe']);
  });

  it('should display the selected formulePanier in the template', () => {
    fixture.detectChanges();

    const formuleElement = fixture.debugElement.query(By.css('.ChoixValidationAbonnement p:nth-child(2)'));
    expect(formuleElement.nativeElement.textContent).toContain('Formule sélectionnée : Panier Solidaire');
  });

  it('should display a message if no formulePanier is selected', () => {
    component.formulePanier = '';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.ChoixValidationAbonnement p:nth-child(2)'));
    expect(messageElement.nativeElement.textContent).toContain('Aucun choix sélectionné.');
  });
});
