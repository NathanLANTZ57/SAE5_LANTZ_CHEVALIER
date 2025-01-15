// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { PaiementAdminComponent } from './paiement-admin.component';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { By } from '@angular/platform-browser';

// describe('PaiementAdminComponent', () => {
//   let component: PaiementAdminComponent;
//   let fixture: ComponentFixture<PaiementAdminComponent>;
//   let httpMock: HttpTestingController;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PaiementAdminComponent],
//       imports: [HttpClientTestingModule],
//     }).compileComponents();

//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PaiementAdminComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch paiements on initialization', () => {
//     const mockPaiements = [
//       { id: 1, nom: 'Dupont', prenom: 'Jean', statut_paiement: 'pending', formule_panier_legumes_bio: 'Panier Simple' },
//       { id: 2, nom: 'Doe', prenom: 'Jane', statut_paiement: 'validated', formule_panier_legumes_bio: 'Panier Familial' },
//     ];

//     const req = httpMock.expectOne('http://localhost:3000/api/adherentsabonne/all');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockPaiements);

//     fixture.detectChanges();

//     expect(component.paiements.length).toBe(2);
//     expect(component.paiements).toEqual(mockPaiements);
//   });

//   it('should update the payment status and refresh the list', () => {
//     const mockPaiements = [
//       { id: 1, nom: 'Dupont', prenom: 'Jean', statut_paiement: 'pending', formule_panier_legumes_bio: 'Panier Simple' },
//     ];

//     component.paiements = mockPaiements;
//     fixture.detectChanges();

//     const reqPatch = httpMock.expectOne(`http://localhost:3000/api/adherentsabonne/1/statut_paiement`);
//     reqPatch.flush({});

//     const reqGet = httpMock.expectOne('http://localhost:3000/api/adherentsabonne/all');
//     reqGet.flush([
//       { id: 1, nom: 'Dupont', prenom: 'Jean', statut_paiement: 'validated', formule_panier_legumes_bio: 'Panier Simple' },
//     ]);

//     fixture.detectChanges();

//     const statutElement = fixture.debugElement.query(By.css('.statut p')).nativeElement;
//     expect(statutElement.textContent.trim()).toBe('Validé');
//   });

//   it('should handle errors during fetch', () => {
//     spyOn(console, 'error');

//     const req = httpMock.expectOne('http://localhost:3000/api/adherentsabonne/all');
//     req.flush('Error fetching data', { status: 500, statusText: 'Server Error' });

//     expect(console.error).toHaveBeenCalledWith(
//       'Erreur lors de la récupération des paiements :',
//       jasmine.anything()
//     );
//     expect(component.paiements.length).toBe(0);
//   });

//   it('should display the correct payment status', () => {
//     component.paiements = [
//       { id: 1, nom: 'Dupont', prenom: 'Jean', statut_paiement: 'pending', formule_panier_legumes_bio: 'Panier Simple' },
//     ];
//     fixture.detectChanges();

//     const statutElement = fixture.debugElement.query(By.css('.statut p')).nativeElement;
//     expect(statutElement.textContent.trim()).toBe('En attente');
//   });

//   it('should display the logo and title correctly', () => {
//     const logo = fixture.debugElement.query(By.css('app-logo'));
//     const title = fixture.debugElement.query(By.css('.titre p'));

//     expect(logo).toBeTruthy();
//     expect(title.nativeElement.textContent.trim()).toBe('Gestion des paiements');
//   });
// });
