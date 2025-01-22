import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InscriptionAdminComponent } from './inscription-admin.component';
import { LogoComponent } from '../logo/logo.component';

describe('InscriptionAdminComponent', () => {
  let component: InscriptionAdminComponent;
  let fixture: ComponentFixture<InscriptionAdminComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionAdminComponent, LogoComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionAdminComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create', () => {
    fixture.detectChanges();

    httpMock.expectOne('http://localhost:3000/api/adherents/status?status=pending').flush([]);
    httpMock.expectOne('http://localhost:3000/api/employes/status?status=pending').flush([]);

    expect(component).toBeTruthy();
  });

  it('should update adherent status and refresh list', () => {
    const mockAdherentId = 1;
    const mockStatus = 'validated';

    component.updateAdherentStatus(mockAdherentId, mockStatus);

    const req = httpMock.expectOne(`http://localhost:3000/api/adherents/${mockAdherentId}/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: mockStatus });

    req.flush({}); 

    const refreshReq = httpMock.expectOne('http://localhost:3000/api/adherents/status?status=pending');
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush([]); 

    expect(component.pendingAdherents).toEqual([]);
  });

  it('should update employee status and refresh list', () => {
    const mockEmployeeId = 1;
    const mockStatus = 'rejected';

    component.updateEmployeeStatus(mockEmployeeId, mockStatus);

    const req = httpMock.expectOne(`http://localhost:3000/api/employes/${mockEmployeeId}/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: mockStatus });

    req.flush({}); 

    const refreshReq = httpMock.expectOne('http://localhost:3000/api/employes/status?status=pending');
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush([]); 

    expect(component.pendingEmployees).toEqual([]);
  });
});
