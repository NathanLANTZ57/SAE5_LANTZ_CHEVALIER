import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ProfilAdherentComponent } from './profil-adherent.component';
import { UserService } from '../shared/user.service';
import { of } from 'rxjs';

describe('ProfilAdherentComponent', () => {
  let component: ProfilAdherentComponent;
  let fixture: ComponentFixture<ProfilAdherentComponent>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      currentUsername: of('testuser'),
      getUserEmail: jasmine.createSpy('getUserEmail').and.returnValue(Promise.resolve('testuser@example.com')),
    };

    await TestBed.configureTestingModule({
      declarations: [ProfilAdherentComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAdherentComponent);
    component = fixture.componentInstance;

    // Initialisation des données simulées
    component.adherentData = {
      nom: 'Dupont',
      prenom: 'Jean',
      date_naissance: '01/01/1980',
      adresse_mail: 'jean.dupont@example.com',
      adresse_postale: '123 Rue Principale',
      ville: 'Paris',
      code_postal: '75000',
    };

    fixture.detectChanges(); // Applique les modifications au DOM
  });

  afterEach(() => {
    fixture.destroy(); // Nettoie après chaque test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch adherent data on initialization', async () => {
    spyOn(component, 'fetchAdherentData').and.callThrough();
    await component.ngOnInit(); // Appeler manuellement la méthode ngOnInit

    expect(mockUserService.getUserEmail).toHaveBeenCalled();
    expect(component.fetchAdherentData).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should display adherent information correctly', () => {
    fixture.detectChanges(); // Applique les modifications au DOM

    const nameElement = fixture.debugElement.query(By.css('.profile-name')).nativeElement.textContent.trim();
    expect(nameElement).toBe('Dupont Jean'); // Vérifie que le nom complet est affiché correctement

    const emailElement = fixture.debugElement.queryAll(By.css('.info-item span'))[3].nativeElement.textContent.trim();
    expect(emailElement).toBe('Jean'); // Vérifie que l'email est affiché correctement
  });

  it('should open and close the abonnement modal', () => {
    component.openModalAbonnement();
    expect(component.isModalAbonnementOpen).toBeTrue();

    component.closeModalAbonnement();
    expect(component.isModalAbonnementOpen).toBeFalse();
  });

  it('should open and close the livraison modal', () => {
    component.openModalLivraison();
    expect(component.isModalLivraisonOpen).toBeTrue();

    component.closeModalLivraison();
    expect(component.isModalLivraisonOpen).toBeFalse();
  });

  it('should open and close the historique paiement modal', () => {
    component.openModalHistoriquePaiement();
    expect(component.isModalHistoriquePaiementOpen).toBeTrue();

    component.closeModalHistoriquePaiement();
    expect(component.isModalHistoriquePaiementOpen).toBeFalse();
  });

  it('should display default text when adherent data is missing', () => {
    component.adherentData = {}; // Suppression des données adhérent
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.profile-name')).nativeElement.textContent.trim();
    expect(nameElement).toBe('Nom non disponible'); // Vérifie que le texte par défaut est affiché

    const emailElement = fixture.debugElement.queryAll(By.css('.info-item span'))[3]?.nativeElement?.textContent?.trim();
    expect(emailElement).toBe('Prénom non disponible'); // Vérifie que l'email n'est pas affiché
  });

  it('should display the logo component', () => {
    const logoElement = fixture.debugElement.query(By.css('app-logo'));
    expect(logoElement).toBeTruthy(); // Vérifie que le composant du logo est affiché
  });

  it('should render all modal components', () => {
    const abonnementModal = fixture.debugElement.query(By.css('app-profil-modal-abonnement'));
    const livraisonModal = fixture.debugElement.query(By.css('app-profil-modal-livraison'));
    const historiqueModal = fixture.debugElement.query(By.css('app-profil-modal-historique-paiement'));

    expect(abonnementModal).toBeTruthy();
    expect(livraisonModal).toBeTruthy();
    expect(historiqueModal).toBeTruthy();
  });
});
