import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the username', () => {
    service.setUsername('TestUser');
    service.currentUsername.subscribe((username) => {
      expect(username).toBe('TestUser');
    });
    expect(service.getUsername()).toBe('TestUser');
  });

  it('should set and get the logged-in status', () => {
    service.setLoggedIn(true);
    service.isLoggedIn$.subscribe((status) => {
      expect(status).toBeTrue();
    });
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should set and get the role', () => {
    service.setRole('admin');
    service.currentRole.subscribe((role) => {
      expect(role).toBe('admin');
    });
    expect(service.getRole()).toBe('admin');
  });

  it('should clear user data', () => {
    service.setUsername('TestUser');
    service.setLoggedIn(true);
    service.setRole('admin');

    service.clearUserData();

    expect(service.getUsername()).toBe('');
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getRole()).toBe('');
  });

  it('should fetch user email by username for adherent', async () => {
    const mockEmail = 'testuser@example.com';
    const mockUsername = 'TestUser';
    const mockResponse = { email: mockEmail };

    service.getUserEmail(mockUsername).then((email) => {
      expect(email).toBe(mockEmail);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/adherents?username=${encodeURIComponent(mockUsername)}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch user email by username for employe', async () => {
    const mockEmail = 'employe@example.com';
    const mockUsername = 'EmployeUser';
    const mockResponse = { email: mockEmail };

    service.getUserEmailEmploye(mockUsername).then((email) => {
      expect(email).toBe(mockEmail);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/employes?username=${encodeURIComponent(mockUsername)}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should throw an error if email is not found for adherent', async () => {
    const mockUsername = 'NonExistentUser';
    const mockResponse = {};

    service.getUserEmail(mockUsername).catch((error) => {
      expect(error.message).toBe('Adresse e-mail non trouvée pour cet utilisateur');
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/adherents?username=${encodeURIComponent(mockUsername)}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should throw an error if email is not found for employe', async () => {
    const mockUsername = 'NonExistentEmploye';
    const mockResponse = {};

    service.getUserEmailEmploye(mockUsername).catch((error) => {
      expect(error.message).toBe('Adresse e-mail non trouvée pour cet utilisateur');
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/employes?username=${encodeURIComponent(mockUsername)}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
