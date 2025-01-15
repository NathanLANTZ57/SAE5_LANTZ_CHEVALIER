// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { By } from '@angular/platform-browser';
// import { ProfilAdherentComponent } from './profil-adherent.component';
// import { UserService } from '../shared/user.service';
// import { of } from 'rxjs';

// describe('ProfilAdherentComponent', () => {
//   let component: ProfilAdherentComponent;
//   let fixture: ComponentFixture<ProfilAdherentComponent>;
//   let mockUserService: any;

//   beforeEach(async () => {
//     mockUserService = {
//       currentUsername: of('testuser'),
//       getUserEmail: jasmine.createSpy('getUserEmail').and.returnValue(Promise.resolve('testuser@example.com')),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [ProfilAdherentComponent],
//       imports: [HttpClientTestingModule],
//       providers: [{ provide: UserService, useValue: mockUserService }],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfilAdherentComponent);
//     component = fixture.componentInstance;

//     // Initialisation des données simulées
//     component.adherentData = {
//       nom: 'Dupont',
//       prenom: 'Jean',
//       date_naissance: '01/01/1980',
//       adresse_mail: 'jean.dupont@example.com',
//       adresse_postale: '123 Rue Principale',
//       ville: 'Paris',
//       code_postal: '75000',
//     };

//     fixture.detectChanges(); // Applique les modifications au DOM
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch adherent data on initialization', async () => {
//     spyOn(component, 'fetchAdherentData').and.callThrough();
//     component.ngOnInit();
//     fixture.detectChanges();

//     expect(mockUserService.getUserEmail).toHaveBeenCalled();
//     expect(component.fetchAdherentData).toHaveBeenCalledWith('testuser@example.com');
//   });

//   it('should display adherent information correctly', () => {
//     fixture.detectChanges(); // Applique les modifications au DOM

//     const nameElement = fixture.debugElement.query(By.css('.profile-name')).nativeElement.textContent.trim();
//     expect(nameElement).toBe('Dupont Jean'); // Vérifie que le nom complet est affiché correctement

//     const emailElement = fixture.debugElement.queryAll(By.css('.info-item span'))[3].nativeElement.textContent.trim();
//     expect(emailElement).toBe('jean.dupont@example.com'); // Vérifie que l'email est affiché correctement
//   });

//   it('should open and close the abonnement modal', () => {
//     component.openModalAbonnement();
//     expect(component.isModalAbonnementOpen).toBeTrue();

//     component.closeModalAbonnement();
//     expect(component.isModalAbonnementOpen).toBeFalse();
//   });

//   it('should open and close the livraison modal', () => {
//     component.openModalLivraison();
//     expect(component.isModalLivraisonOpen).toBeTrue();

//     component.closeModalLivraison();
//     expect(component.isModalLivraisonOpen).toBeFalse();
//   });

//   it('should open and close the historique paiement modal', () => {
//     component.openModalHistoriquePaiement();
//     expect(component.isModalHistoriquePaiementOpen).toBeTrue();

//     component.closeModalHistoriquePaiement();
//     expect(component.isModalHistoriquePaiementOpen).toBeFalse();
//   });

//   it('should display default text when adherent data is missing', () => {
//     component.adherentData = {}; // Simule l'absence de données
//     fixture.detectChanges();

//     const nameElement = fixture.debugElement.query(By.css('.profile-name')).nativeElement.textContent.trim();
//     expect(nameElement).toBe('Nom non disponible'); // Texte par défaut pour le nom

//     const emailElement = fixture.debugElement.queryAll(By.css('.info-item span'))[3]?.nativeElement.textContent.trim();
//     expect(emailElement).toBe('Prénom non disponible'); // Texte par défaut pour l'email
//   });

//   it('should display the logo component', () => {
//     const logoElement = fixture.debugElement.query(By.css('app-logo'));
//     expect(logoElement).toBeTruthy(); // Vérifie que le composant logo est rendu
//   });

//   it('should render all modal components', () => {
//     const abonnementModal = fixture.debugElement.query(By.css('app-profil-modal-abonnement'));
//     const livraisonModal = fixture.debugElement.query(By.css('app-profil-modal-livraison'));
//     const historiqueModal = fixture.debugElement.query(By.css('app-profil-modal-historique-paiement'));

//     expect(abonnementModal).toBeTruthy(); // Vérifie que le modal d'abonnement est rendu
//     expect(livraisonModal).toBeTruthy(); // Vérifie que le modal de livraison est rendu
//     expect(historiqueModal).toBeTruthy(); // Vérifie que le modal d'historique de paiement est rendu
//   });
// });
