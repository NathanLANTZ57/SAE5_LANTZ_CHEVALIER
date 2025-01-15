// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormulaireValidationComponent } from './formulaire-validation.component';
// import { By } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AdherentDataService } from '../shared/adherent-data.service';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('FormulaireValidationComponent', () => {
//   let component: FormulaireValidationComponent;
//   let fixture: ComponentFixture<FormulaireValidationComponent>;
//   let mockAdherentDataService: any;
//   let router: Router;

//   beforeEach(async () => {
//     mockAdherentDataService = {
//       getAllData: jasmine.createSpy('getAllData').and.returnValue({
//         nom: 'Dupont',
//         prenom: 'Jean',
//         dateNaissance: '1990-01-01',
//         email: 'jean.dupont@example.com',
//         adresse: '123 Rue Principale',
//         ville: 'Paris',
//         codePostal: '75000',
//         totalCotisation: 20,
//         montantDon: 5,
//         panierLegumes: true,
//         nbPanierLegumes: 3,
//         panierFruits: false,
//         nbPanierFruits: 0,
//         boiteOeuf: true,
//         nbBoiteOeuf: 2,
//         domicile: true,
//         iban: 'FR7612345678901234567890123',
//         bic: 'BANKUS33XXX'
//       }),
//       resetData: jasmine.createSpy('resetData')
//     };

//     await TestBed.configureTestingModule({
//       declarations: [ FormulaireValidationComponent ],
//       imports: [ HttpClientTestingModule, RouterTestingModule ],
//       providers: [
//         { provide: AdherentDataService, useValue: mockAdherentDataService }
//       ]
//     }).compileComponents();

//     router = TestBed.inject(Router);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormulaireValidationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize adherentData from AdherentDataService', () => {
//     expect(mockAdherentDataService.getAllData).toHaveBeenCalled();
//     expect(component.adherentData.nom).toBe('Dupont');
//     expect(component.adherentData.prenom).toBe('Jean');
//   });

//   it('should navigate back if no data is available', () => {
//     spyOn(router, 'navigate');
//     mockAdherentDataService.getAllData.and.returnValue(null);

//     component.ngOnInit();

//     expect(router.navigate).toHaveBeenCalledWith(['/formulaire-iban']);
//   });

//   it('should post data and navigate on confirm', () => {
//     spyOn(window, 'alert');
//     spyOn(router, 'navigate');

//     component.onConfirm();

//     expect(mockAdherentDataService.resetData).toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['/']);
//     expect(window.alert).toHaveBeenCalledWith('Votre inscription a été enregistrée avec succès.');
//   });

//   it('should navigate back to IBAN form on cancel', () => {
//     spyOn(router, 'navigate');

//     component.onCancel();

//     expect(router.navigate).toHaveBeenCalledWith(['/formulaire-iban']);
//   });

//   it('should display adherent data correctly in the template', () => {
//     fixture.detectChanges();

//     const nomElement = fixture.debugElement.query(By.css('.info-section p:first-child strong'));
//     expect(nomElement.nativeElement.textContent).toContain('Dupont');

//     const emailElement = fixture.debugElement.query(By.css('.info-section p:nth-child(4) strong'));
//     expect(emailElement.nativeElement.textContent).toContain('jean.dupont@example.com');
//   });
// });
