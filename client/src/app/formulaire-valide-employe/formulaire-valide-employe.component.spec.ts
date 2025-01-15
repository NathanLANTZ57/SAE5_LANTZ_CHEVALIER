// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormulaireValideEmployeComponent } from './formulaire-valide-employe.component';
// import { By } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { EmployeDataService } from '../shared/employe-data.service';

// describe('FormulaireValideEmployeComponent', () => {
//   let component: FormulaireValideEmployeComponent;
//   let fixture: ComponentFixture<FormulaireValideEmployeComponent>;
//   let mockEmployeDataService: jasmine.SpyObj<EmployeDataService>;
//   let router: Router;
//   let httpClient: HttpClient;

//   beforeEach(async () => {
//     mockEmployeDataService = jasmine.createSpyObj('EmployeDataService', ['getAllData']);
//     mockEmployeDataService.getAllData.and.returnValue({
//       nom: 'Dupont',
//       prenom: 'Jean',
//       dateNaissance: '1990-01-01',
//       email: 'jean.dupont@example.com',
//       adresse: '123 Rue Principale',
//       ville: 'Paris',
//       codePostal: '75000',
//       formulePanier: 'Panier Solidaire'
//     });

//     await TestBed.configureTestingModule({
//       declarations: [ FormulaireValideEmployeComponent ],
//       imports: [ HttpClientTestingModule, RouterTestingModule ],
//       providers: [
//         { provide: EmployeDataService, useValue: mockEmployeDataService }
//       ]
//     }).compileComponents();

//     router = TestBed.inject(Router);
//     httpClient = TestBed.inject(HttpClient);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormulaireValideEmployeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should alert if required fields are missing', () => {
//     mockEmployeDataService.getAllData.and.returnValue({
//       nom: '',
//       prenom: '',
//       dateNaissance: '',
//       email: '',
//       adresse: '',
//       ville: '',
//       codePostal: '',
//       formulePanier: ''
//     });
//     spyOn(window, 'alert');

//     component.onSave();

//     expect(window.alert).toHaveBeenCalledWith('Certaines informations nécessaires sont manquantes.');
//   });

//   it('should send a POST request and navigate on successful save', async () => {
//     spyOn(window, 'alert');
//     spyOn(router, 'navigate');

//     await component.onSave();

//     expect(mockEmployeDataService.getAllData).toHaveBeenCalled();
//     expect(window.alert).toHaveBeenCalledWith('Votre abonnement a été enregistré avec succès !');
//     expect(router.navigate).toHaveBeenCalledWith(['/profil']);
//   });

//   it('should handle error during save', async () => {
//     spyOn(window, 'alert');
    
//     await component.onSave();

//     expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
//   });

//   it('should render the subscription information correctly', () => {
//     fixture.detectChanges();

//     const abonnementText = fixture.debugElement.query(By.css('.ChoixValidationAbonnement p:first-child')).nativeElement.textContent;
//     expect(abonnementText).toContain('Votre abonnement a été pris en compte.');
//   });

//   it('should navigate back when abandon button is clicked', () => {
//     spyOn(router, 'navigate');

//     const abandonButton = fixture.debugElement.query(By.css('.abandonner a'));
//     abandonButton.triggerEventHandler('click', null);

//     expect(router.navigate).toHaveBeenCalledWith(['/formulaire-choix-panier-employe']);
//   });
// });
