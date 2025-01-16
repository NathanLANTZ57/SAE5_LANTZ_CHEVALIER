import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaiementAdminComponent } from './paiement-admin.component';
import { HttpClient } from '@angular/common/http';
import { LogoComponent } from '../logo/logo.component';

describe('PaiementAdminComponent', () => {
  let component: PaiementAdminComponent;
  let fixture: ComponentFixture<PaiementAdminComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiementAdminComponent, LogoComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(PaiementAdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch paiements on initialization', () => {
    const mockPaiements = [
      { id: 1, nom: 'Doe', prenom: 'John', statut_paiement: 'pending', formule_panier_legumes_bio: 'Panier Moyen' },
      { id: 2, nom: 'Smith', prenom: 'Anna', statut_paiement: 'validated', formule_panier_legumes_bio: 'Panier Grand' },
    ];

    fixture.detectChanges(); 

    const req = httpMock.expectOne('http://localhost:3000/api/adherentsabonne/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockPaiements); 

    expect(component.paiements.length).toBe(2);
    expect(component.paiements).toEqual(mockPaiements);
  });

  it('should update paiement status and refresh the list', () => {
    const mockPaiementId = 1;
    const mockStatus = 'validated';

    spyOn(component, 'fetchPaiements'); 

    component.updatePaiementStatus(mockPaiementId, mockStatus);

    const patchReq = httpMock.expectOne(`http://localhost:3000/api/adherentsabonne/${mockPaiementId}/statut_paiement`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ statut_paiement: mockStatus });
    patchReq.flush({});

    const getReq = httpMock.expectOne('http://localhost:3000/api/adherentsabonne/all');
    getReq.flush([]);

    expect(component.fetchPaiements).toHaveBeenCalled();
  }); 
});
