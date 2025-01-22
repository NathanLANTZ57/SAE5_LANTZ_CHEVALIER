import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormulaireModeLivraisonComponent } from './formulaire-mode-livraison.component';
import { AdherentDataService } from '../shared/adherent-data.service';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireModeLivraisonComponent', () => {
  let component: FormulaireModeLivraisonComponent;
  let fixture: ComponentFixture<FormulaireModeLivraisonComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAdherentDataService: any;

  beforeEach(async () => {
    // Mock des dépendances
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        const data = { depot: 'Depot 1', domicile: true };
        return data[key];
      }),
      setData: jasmine.createSpy('setData'),
    };

    await TestBed.configureTestingModule({
      declarations: [FormulaireModeLivraisonComponent, LogoComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AdherentDataService, useValue: mockAdherentDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize depot and domicile from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('depot');
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('domicile');
    expect(component.depot).toBe('Depot 1');
    expect(component.domicile).toBeTrue();
  });

  it('should navigate to /app-formulaire-mode-paiement when onNext is called and data is valid', () => {
    component.depot = 'Depot 2';
    component.domicile = false;

    component.onNext();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('depot', 'Depot 2');
    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('domicile', false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/app-formulaire-mode-paiement']);
  });

  it('should alert if no mode of delivery is selected when onNext is called', () => {
    spyOn(window, 'alert');
    component.depot = '';
    component.domicile = false;

    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Veuillez choisir un mode de livraison (Dépôt ou Domicile).');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /app-formulaire-choix when onBack is called', () => {
    component.onBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/app-formulaire-choix']);
  });

  it('should navigate to /app-formulaire-semaine-livraison when onChooseWeeks is called', () => {
    component.onChooseWeeks();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/app-formulaire-semaine-livraison']);
  });
});
