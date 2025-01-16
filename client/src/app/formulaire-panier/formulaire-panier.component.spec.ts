import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulairePanierComponent } from './formulaire-panier.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';

describe('FormulairePanierComponent', () => {
  let component: FormulairePanierComponent;
  let fixture: ComponentFixture<FormulairePanierComponent>;
  let mockAdherentDataService: any;
  let mockUserService: any;

  beforeEach(async () => {
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        const data = {
          nom: 'Dupont',
          prenom: 'Jean',
          dateNaissance: '1990-01-01',
          email: 'jean.dupont@example.com',
          adresse: '123 Rue Principale',
          ville: 'Paris',
          codePostal: '75000',
        };
        return data[key] || '';
      }),
      setData: jasmine.createSpy('setData'),
    };

    mockUserService = {
      currentUsername: of('jean.dupont'),
      getUserEmail: jasmine
        .createSpy('getUserEmail')
        .and.returnValue(Promise.resolve('jean.dupont@example.com')),
    };

    await TestBed.configureTestingModule({
      declarations: [FormulairePanierComponent, LogoComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AdherentDataService, useValue: mockAdherentDataService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePanierComponent);
    component = fixture.componentInstance;

    // Initialisation des champs simulés
    component.nom = mockAdherentDataService.getData('nom');
    component.prenom = mockAdherentDataService.getData('prenom');
    component.dateNaissance = mockAdherentDataService.getData('dateNaissance');
    component.email = mockAdherentDataService.getData('email');
    component.adresse = mockAdherentDataService.getData('adresse');
    component.ville = mockAdherentDataService.getData('ville');
    component.codePostal = mockAdherentDataService.getData('codePostal');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('nom');
    expect(component.nom).toBe('Dupont');
    expect(component.prenom).toBe('Jean');
    expect(component.dateNaissance).toBe('1990-01-01');
    expect(component.email).toBe('jean.dupont@example.com');
    expect(component.adresse).toBe('123 Rue Principale');
    expect(component.ville).toBe('Paris');
    expect(component.codePostal).toBe('75000');
  });

  it('should validate email against emailUtilisateur', async () => {
    await fixture.whenStable(); // Attendre que les promesses soient résolues
    const emailUtilisateur = await mockUserService.getUserEmail();
    component.email = emailUtilisateur;
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error p'));
    expect(errorMessage).toBeFalsy(); // Aucun message d'erreur attendu
  });

  it('should display an alert if required fields are missing', () => {
    spyOn(window, 'alert');

    component.nom = ''; // Simuler un champ manquant
    component.onNext();

    expect(window.alert).toHaveBeenCalledWith(
      'Veuillez remplir tous les champs obligatoires.'
    );
  });
});
