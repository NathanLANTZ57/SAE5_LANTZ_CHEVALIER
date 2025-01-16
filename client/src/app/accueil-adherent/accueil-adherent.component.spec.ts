import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilAdherentComponent } from './accueil-adherent.component';
import { UserService } from '../shared/user.service';
import { of } from 'rxjs';

describe('AccueilAdherentComponent', () => {
  let component: AccueilAdherentComponent;
  let fixture: ComponentFixture<AccueilAdherentComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn$', 'currentRole']);

    await TestBed.configureTestingModule({
      declarations: [ AccueilAdherentComponent ],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdherentComponent);
    component = fixture.componentInstance;

    mockUserService.isLoggedIn$ = of(true);
    mockUserService.currentRole = of('adherent');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with logged in status and role', () => {
    expect(component.isLoggedIn).toBeTrue();
    expect(component.role).toBe('adherent');
  });

  it('should alert user if not logged in when checking login status', () => {
    spyOn(window, 'alert');
    component.isLoggedIn = false;

    component.checkLoginStatus();

    expect(window.alert).toHaveBeenCalledWith('Veuillez vous connecter pour accéder à votre profil.');
  });
});
