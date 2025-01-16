import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockProduitsComponent } from './stock-produits.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';

describe('StockProduitsComponent', () => {
  let component: StockProduitsComponent;
  let fixture: ComponentFixture<StockProduitsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockProduitsComponent, LogoComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockProduitsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    const requests = httpMock.match((req) => true); 
    requests.forEach((req) => req.flush([])); 
    httpMock.verify(); 
  });
  

  it('should fetch legumes on initialization', () => {
    const mockLegumes = [
      { categorie: 'Racine', nom: 'Carotte', quantite: 50 },
      { categorie: 'Feuille', nom: 'Laitue', quantite: 30 },
    ];

    const req = httpMock.expectOne(`${component['apiUrl']}/legumes/afficher`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLegumes);

    expect(component.legumes).toEqual(mockLegumes);
  });

  it('should fetch legumes and fruits on initialization', () => {
    const mockLegumes = [
      { categorie: 'Racine', nom: 'Carotte', quantite: 50 },
      { categorie: 'Feuille', nom: 'Laitue', quantite: 30 },
    ];
    const mockFruits = [
      { categorie: 'Agrume', nom: 'Orange', quantite: 40 },
      { categorie: 'Baie', nom: 'Fraise', quantite: 20 },
    ];
  
    const legumesReq = httpMock.expectOne(`${component['apiUrl']}/legumes/afficher`);
    expect(legumesReq.request.method).toBe('GET');
    legumesReq.flush(mockLegumes);
  
    const fruitsReq = httpMock.expectOne(`${component['apiUrl']}/fruits/afficher`);
    expect(fruitsReq.request.method).toBe('GET');
    fruitsReq.flush(mockFruits);
  
    expect(component.legumes).toEqual(mockLegumes);
    expect(component.fruits).toEqual(mockFruits);
  });
  

  it('should open the modal when openModal is called', () => {
    component.isModalOpen = false;
    component.openModal();
    expect(component.isModalOpen).toBeTrue();
  });

  it('should close the modal and reset newProduit when closeModal is called', () => {
    component.isModalOpen = true;
    component.newProduit = { type: 'fruit', categorie: 'Agrume', nom: 'Orange', quantite: '50' };

    component.closeModal();

    expect(component.isModalOpen).toBeFalse();
    expect(component.newProduit).toEqual({ type: 'legume', categorie: '', nom: '', quantite: '' });
  });

  it('should add a new legume and close the modal', () => {
    component.newProduit = { type: 'legume', categorie: 'Racine', nom: 'Betterave', quantite: '10' };

    component.addProduit();

    const req = httpMock.expectOne(`${component['apiUrl']}/legumes`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });

    expect(component.legumes).toContain(jasmine.objectContaining({ nom: 'Betterave' }));
    expect(component.isModalOpen).toBeFalse();
  });

  it('should add a new fruit and close the modal', () => {
    component.newProduit = { type: 'fruit', categorie: 'Agrume', nom: 'Citron', quantite: '15' };

    component.addProduit();

    const req = httpMock.expectOne(`${component['apiUrl']}/fruits`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });

    expect(component.fruits).toContain(jasmine.objectContaining({ nom: 'Citron' }));
    expect(component.isModalOpen).toBeFalse();
  });

  it('should handle errors during the addition of a product', () => {
    spyOn(window, 'alert');
    component.newProduit = { type: 'fruit', categorie: 'Baie', nom: 'Fraise', quantite: '20' };

    component.addProduit();

    const req = httpMock.expectOne(`${component['apiUrl']}/fruits`);
    req.flush({ message: 'Erreur' }, { status: 500, statusText: 'Internal Server Error' });

    expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue lors de l\'ajout du produit. Veuillez réessayer.');
    expect(component.isModalOpen).toBeFalse(); 
  });

  it('should display legumes and fruits in the template', () => {
    const mockLegumes = [{ categorie: 'Racine', nom: 'RacineCarotte50', quantite: 50 }];
    const mockFruits = [{ categorie: 'Agrume', nom: 'RacineCarotte50', quantite: 40 }];
  
    const legumesReq = httpMock.expectOne(`${component['apiUrl']}/legumes/afficher`);
    expect(legumesReq.request.method).toBe('GET');
    legumesReq.flush(mockLegumes);
  
    const fruitsReq = httpMock.expectOne(`${component['apiUrl']}/fruits/afficher`);
    expect(fruitsReq.request.method).toBe('GET');
    fruitsReq.flush(mockFruits);
  
    expect(component.legumes).toEqual(mockLegumes);
    expect(component.fruits).toEqual(mockFruits);
  
    fixture.detectChanges();
  
    const legumeRows = fixture.debugElement.queryAll(By.css('.stocksProduits tbody tr'));
    expect(legumeRows.length).toBe(2); 
    expect(legumeRows[0].nativeElement.textContent).toContain('Carotte');
  
    const fruitRows = fixture.debugElement.queryAll(By.css('.stocksProduits tbody tr'));
    expect(fruitRows.length).toBe(2); 
    expect(fruitRows[0].nativeElement.textContent).toContain('RacineRacineCarotte5050');
  });
  
});
