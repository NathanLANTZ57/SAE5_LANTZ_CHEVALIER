import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs'; // Importez of et throwError pour les valeurs simulées
import { SidebarComponent } from './sidebar.component';
import { UserService } from '../shared/user.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['setLoggedIn', 'setUsername', 'setRole']);

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the sidebar', () => {
    component.isSidebarOpen = false;
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();

    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should open login modal', () => {
    component.showLoginModal = false;
    component.openModal();
    expect(component.showLoginModal).toBeTrue();
  });

  it('should close login modal', () => {
    component.showLoginModal = true;
    component.closeModal();
    expect(component.showLoginModal).toBeFalse();
  });

  it('should set the user details and login on successful login', () => {
    component.username = 'testuser';
    component.password = 'password';
    component.role = 'adherent';

    const loginResponse = { adherent: true };
    spyOn(component['http'], 'post').and.returnValue(of(loginResponse)); // Utilisez of pour retourner une réponse simulée

    component.onLogin();

    expect(component.isLoggedIn).toBeTrue();
    expect(component.role).toBe('adherent');
    expect(mockUserService.setLoggedIn).toHaveBeenCalledWith(true);
    expect(mockUserService.setUsername).toHaveBeenCalledWith('testuser');
    expect(mockUserService.setRole).toHaveBeenCalledWith('adherent');
  });

  it('should handle login error', () => {
    component.username = 'invaliduser';
    component.password = 'wrongpassword';
    component.role = 'adherent';

    spyOn(component['http'], 'post').and.returnValue(throwError({ status: 401 })); // Utilisez throwError pour retourner une erreur simulée

    spyOn(window, 'alert');
    component.onLogin();
    expect(window.alert).toHaveBeenCalledWith('Nom ou mot de passe incorrect.');
  });

  it('should log out the user', () => {
    spyOn(window, 'alert');
    component.isLoggedIn = true;
    component.role = 'adherent';

    component.onLogout();

    expect(component.isLoggedIn).toBeFalse();
    expect(component.role).toBe('');
    expect(mockUserService.setLoggedIn).toHaveBeenCalledWith(false);
    expect(mockUserService.setUsername).toHaveBeenCalledWith('');
    expect(mockUserService.setRole).toHaveBeenCalledWith('');
    expect(window.alert).toHaveBeenCalledWith('Déconnexion réussie.');
  });

  it('should open signup modal', () => {
    component.showSignupModal = false;
    component.openSignupModal();
    expect(component.showSignupModal).toBeTrue();
  });

  it('should close signup modal', () => {
    component.showSignupModal = true;
    component.closeSignupModal();
    expect(component.showSignupModal).toBeFalse();
  });

  it('should handle successful signup', () => {
    component.signupUsername = 'newuser';
    component.signupPassword = 'password123';
    component.signupEmail = 'newuser@example.com';
    component.signupRole = 'adherent';

    const signupResponse = { success: true };
    spyOn(component['http'], 'post').and.returnValue(of(signupResponse)); // Utilisez of pour retourner une réponse simulée

    spyOn(window, 'alert');
    component.onSignup();

    expect(window.alert).toHaveBeenCalledWith('Inscription réussie pour newuser! (adherent)');
    expect(component.showSignupModal).toBeFalse();
  });

  it('should handle signup error', () => {
    component.signupUsername = 'newuser';
    component.signupPassword = 'password123';
    component.signupEmail = 'newuser@example.com';
    component.signupRole = 'adherent';

    spyOn(component['http'], 'post').and.returnValue(throwError({ status: 400 })); // Utilisez throwError pour retourner une erreur simulée

    spyOn(window, 'alert');
    component.onSignup();
    expect(window.alert).toHaveBeenCalledWith('Données d\'inscription invalides. Veuillez vérifier vos informations.');
  });
});
