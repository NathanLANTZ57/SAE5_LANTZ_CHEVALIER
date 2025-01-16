import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireChoixPanierEmployeComponent } from './formulaire-choix-panier-employe.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeDataService } from '../shared/employe-data.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireChoixPanierEmployeComponent', () => {
  let component: FormulaireChoixPanierEmployeComponent;
  let fixture: ComponentFixture<FormulaireChoixPanierEmployeComponent>;
  let mockEmployeDataService: any;

  beforeEach(async () => {
    mockEmployeDataService = {
      getData: jasmine.createSpy('getData').and.returnValue(''),
      setData: jasmine.createSpy('setData')
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulaireChoixPanierEmployeComponent, LogoComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: EmployeDataService, useValue: mockEmployeDataService }
      ]
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

  it('should initialize formulePanier from EmployeDataService', () => {
    expect(mockEmployeDataService.getData).toHaveBeenCalledWith('formulePanier');
  });

  it('should display an alert if no formulePanier is selected when onNext is called', () => {
    spyOn(window, 'alert');
    component.formulePanier = '';

    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Veuillez sélectionner une formule de panier.');
  });

  it('should call setData on EmployeDataService when onNext is called with a valid formulePanier', () => {
    component.formulePanier = 'panierSolidaire';

    component.onNext();

    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('formulePanier', 'panierSolidaire');
  });

  it('should navigate to /formulaire-validation-employe when onNext is called with a valid formulePanier', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.formulePanier = 'panierSolidaire';

    component.onNext();

    expect(router.navigate).toHaveBeenCalledWith(['/formulaire-validation-employe']);
  });

  it('should render radio buttons for panier options', () => {
    const radioButtons = fixture.debugElement.queryAll(By.css('.formChoixPanierEmploye input[type="radio"]'));
    expect(radioButtons.length).toBe(2);
    expect(radioButtons[0].nativeElement.value).toBe('panierSolidaire');
    expect(radioButtons[1].nativeElement.value).toBe('panierSimple');
  });

  it('should update formulePanier when a radio button is selected', () => {
    const radioButton = fixture.debugElement.query(By.css('#panierSolidaire'));
    radioButton.nativeElement.checked = true;
    radioButton.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.formulePanier).toBe('');
  });
});