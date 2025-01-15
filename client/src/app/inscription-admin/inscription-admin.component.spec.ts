// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { InscriptionAdminComponent } from './inscription-admin.component';
// import { By } from '@angular/platform-browser';

// describe('InscriptionAdminComponent', () => {
//   let component: InscriptionAdminComponent;
//   let fixture: ComponentFixture<InscriptionAdminComponent>;
//   let httpMock: HttpTestingController;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ InscriptionAdminComponent ],
//       imports: [ HttpClientTestingModule ]
//     })
//     .compileComponents();

//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(InscriptionAdminComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch pending adherents on initialization', () => {
//     const mockAdherents = [
//       { id: 1, name: 'Jean Dupont', email: 'jean@example.com' },
//       { id: 2, name: 'Marie Curie', email: 'marie@example.com' }
//     ];

//     component.ngOnInit();

//     const req = httpMock.expectOne('http://localhost:3000/api/adherents/status?status=pending');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockAdherents);

//     expect(component.pendingAdherents).toEqual(mockAdherents);
//   });

//   it('should fetch pending employees on initialization', () => {
//     const mockEmployees = [
//       { id: 1, name: 'Albert Einstein', email: 'albert@example.com' },
//       { id: 2, name: 'Isaac Newton', email: 'isaac@example.com' }
//     ];

//     component.ngOnInit();

//     const req = httpMock.expectOne('http://localhost:3000/api/employes/status?status=pending');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockEmployees);

//     expect(component.pendingEmployees).toEqual(mockEmployees);
//   });

//   it('should update adherent status and refresh list', () => {
//     const mockAdherentId = 1;
//     const mockStatus = 'validated';

//     component.updateAdherentStatus(mockAdherentId, mockStatus);

//     const req = httpMock.expectOne(`http://localhost:3000/api/adherents/${mockAdherentId}/status`);
//     expect(req.request.method).toBe('PATCH');
//     expect(req.request.body).toEqual({ status: mockStatus });

//     req.flush({});

//     const refreshReq = httpMock.expectOne('http://localhost:3000/api/adherents/status?status=pending');
//     expect(refreshReq.request.method).toBe('GET');
//     refreshReq.flush([]);

//     expect(component.pendingAdherents).toEqual([]);
//   });

//   it('should update employee status and refresh list', () => {
//     const mockEmployeeId = 1;
//     const mockStatus = 'rejected';

//     component.updateEmployeeStatus(mockEmployeeId, mockStatus);

//     const req = httpMock.expectOne(`http://localhost:3000/api/employes/${mockEmployeeId}/status`);
//     expect(req.request.method).toBe('PATCH');
//     expect(req.request.body).toEqual({ status: mockStatus });

//     req.flush({});

//     const refreshReq = httpMock.expectOne('http://localhost:3000/api/employes/status?status=pending');
//     expect(refreshReq.request.method).toBe('GET');
//     refreshReq.flush([]);

//     expect(component.pendingEmployees).toEqual([]);
//   });

//   it('should render adherent table rows correctly', () => {
//     component.pendingAdherents = [
//       { id: 1, name: 'Jean Dupont', email: 'jean@example.com' }
//     ];
//     fixture.detectChanges();

//     const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
//     expect(tableRows.length).toBe(1);
//     expect(tableRows[0].nativeElement.textContent).toContain('Jean Dupont');
//     expect(tableRows[0].nativeElement.textContent).toContain('jean@example.com');
//   });
// });
