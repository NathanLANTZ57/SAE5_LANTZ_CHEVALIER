import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JoursLivraisonService, DeliveryDay } from './jours-livraison.service';

describe('JoursLivraisonService', () => {
  let service: JoursLivraisonService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'http://localhost:3000/api/jours-livraison';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import du module de test HTTP
      providers: [JoursLivraisonService],
    });
    service = TestBed.inject(JoursLivraisonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve delivery days for a specific year and month', () => {
    const mockResponse: DeliveryDay[] = [
      { id: 1, date: '2025-01-15', tournee: 'Tour 1', frequence: 'Toutes les semaines' },
      { id: 2, date: '2025-01-22', tournee: 'Tour 2', frequence: 'Toutes les 2 semaines' },
    ];

    service.getJoursLivraison(2025, 1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}?year=2025&month=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a single delivery day', () => {
    const newDeliveryDay: DeliveryDay = {
      date: '2025-02-10',
      tournee: 'Tour 1',
      frequence: 'Toutes les semaines',
    };

    service.addJourLivraison(newDeliveryDay).subscribe((response) => {
      expect(response).toEqual({ ...newDeliveryDay, id: 3 });
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newDeliveryDay);

    req.flush({ ...newDeliveryDay, id: 3 });
  });

  it('should add multiple delivery days', () => {
    const newDeliveryDays: DeliveryDay[] = [
      { date: '2025-02-10', tournee: 'Tour 1', frequence: 'Toutes les semaines' },
      { date: '2025-02-17', tournee: 'Tour 2', frequence: 'Toutes les semaines' },
    ];

    service.addMultipleJoursLivraison(newDeliveryDays).subscribe(() => {
      expect(true).toBeTrue(); // Vérifie simplement que la requête a réussi
    });

    const req = httpMock.expectOne(`${mockApiUrl}/bulk`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newDeliveryDays);

    req.flush(null); // Pas de réponse spécifique attendue
  });

  it('should delete a delivery day by ID', () => {
    const idToDelete = 5;

    service.deleteJourLivraison(idToDelete).subscribe(() => {
      expect(true).toBeTrue(); // Vérifie simplement que la requête a réussi
    });

    const req = httpMock.expectOne(`${mockApiUrl}/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null); // Pas de réponse spécifique attendue
  });

  it('should update a delivery day', () => {
    const updatedDeliveryDay: DeliveryDay = {
      id: 7,
      date: '2025-02-15',
      tournee: 'Tour 3',
      frequence: 'Toutes les 2 semaines',
    };
  
    const idToUpdate = 7;
  
    service.updateJourLivraison(idToUpdate, updatedDeliveryDay).subscribe((response) => {
      expect(response).toEqual(updatedDeliveryDay);
    });
  
    const req = httpMock.expectOne(`${mockApiUrl}/${idToUpdate}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedDeliveryDay);
  
    req.flush(updatedDeliveryDay);
  });
});
