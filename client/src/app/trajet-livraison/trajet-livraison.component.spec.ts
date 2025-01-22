import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrajetLivraisonComponent } from './trajet-livraison.component';

describe('TrajetLivraisonComponent', () => {
  let component: TrajetLivraisonComponent;
  let fixture: ComponentFixture<TrajetLivraisonComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrajetLivraisonComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetLivraisonComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(component, 'fetchTrajets').and.callFake(() => {});
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); 
    if (component.map) {
      component.map.remove(); 
      (component.map as any) = null;
    }
  });

  it('should fetch trajets and filter them by day', () => {
    const mockTrajets = [
      { id: 1, day: 'Mardi', type: 'Type 1', locations: [] },
      { id: 2, day: 'Mercredi', type: 'Type 2', locations: [] },
    ];

    (component.fetchTrajets as jasmine.Spy).and.callThrough();

    component.fetchTrajets();

    const req = httpMock.expectOne('http://localhost:3000/api/trajets-livraison');
    expect(req.request.method).toBe('GET');
    req.flush(mockTrajets);

    expect(component.trajets).toEqual(mockTrajets);
    expect(component.days[0].trajets).toEqual([mockTrajets[0]]);
    expect(component.days[1].trajets).toEqual([mockTrajets[1]]); 
  });

  it('should delete a trajet and refresh the list', () => {
    const mockTrajetId = 1;

    component.deleteTrajet(mockTrajetId);

    const deleteReq = httpMock.expectOne(`http://localhost:3000/api/trajets-livraison/${mockTrajetId}`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);

    expect(component.fetchTrajets).toHaveBeenCalled();
  });

  it('should add a new trajet and refresh the list', () => {
    component.newTrajet = {
      day: 'Mardi',
      type: 'Type 1',
      locations: [
        { name: 'Location 1', address: 'Address 1', coords: [48.28361, 6.9495], pointNumber: 1 },
      ],
    };

    component.addTrajet();

    const addReq = httpMock.expectOne('http://localhost:3000/api/trajets-livraison');
    expect(addReq.request.method).toBe('POST');
    expect(addReq.request.body).toEqual(component.newTrajet);
    addReq.flush(null);

    expect(component.fetchTrajets).toHaveBeenCalled();
  });

  it('should handle multiple fetch requests', () => {
    const mockTrajets = [
      { id: 1, day: 'Mardi', type: 'Type 1', locations: [] },
      { id: 2, day: 'Mercredi', type: 'Type 2', locations: [] },
    ];

    (component.fetchTrajets as jasmine.Spy).and.callThrough();

    component.fetchTrajets();
    component.fetchTrajets();

    const requests = httpMock.match('http://localhost:3000/api/trajets-livraison');
    expect(requests.length).toBe(2);

    requests.forEach((req) => req.flush(mockTrajets));

    expect(component.trajets).toEqual(mockTrajets);
  });
});
