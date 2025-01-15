import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulairePanierEmployeComponent } from './formulaire-panier-employe.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeDataService } from '../shared/employe-data.service';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('FormulairePanierEmployeComponent', () => {
  let component: FormulairePanierEmployeComponent;
  let fixture: ComponentFixture<FormulairePanierEmployeComponent>;
  let mockEmployeDataService: any;
  let mockUserService: any;

  beforeEach(async () => {
    mockEmployeDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        const data = {
          nom: 'Durand',
          prenom: 'Marie',
          dateNaissance: '1985-05-15',
          email: 'marie.durand@example.com',
          adresse: '45 Avenue des Champs',
          ville: 'Lyon',
          codePostal: '69000'
        };
        return data[key] || '';
      }),
      setData: jasmine.createSpy('setData')
    };

    mockUserService = {
      currentUsername: of('marie.durand'),
      getUserEmailEmploye: jasmine.createSpy('getUserEmailEmploye').and.returnValue(Promise.resolve('marie.durand@example.com'))
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulairePanierEmployeComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: EmployeDataService, useValue: mockEmployeDataService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePanierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields from EmployeDataService', () => {
    expect(mockEmployeDataService.getData).toHaveBeenCalledWith('nom');
    expect(component.nom).toBe('Durand');
    expect(component.prenom).toBe('Marie');
    expect(component.dateNaissance).toBe('1985-05-15');
    expect(component.email).toBe('marie.durand@example.com');
    expect(component.adresse).toBe('45 Avenue des Champs');
    expect(component.ville).toBe('Lyon');
    expect(component.codePostal).toBe('69000');
  });

  it('should validate email against emailUtilisateur', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    component.email = 'wrong.email@example.com';
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error p'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('L\'adresse e-mail doit correspondre à celle utilisée pour l\'utilisateur connecté.');
  });

  it('should save data and navigate to next page on valid submission', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.nom = 'Durand';
    component.prenom = 'Marie';
    component.dateNaissance = '1985-05-15';
    component.email = 'marie.durand@example.com';
    component.adresse = '45 Avenue des Champs';
    component.ville = 'Lyon';
    component.codePostal = '69000';

    component.onSubmit();

    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('nom', 'Durand');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('prenom', 'Marie');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('dateNaissance', '1985-05-15');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('email', 'marie.durand@example.com');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('adresse', '45 Avenue des Champs');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('ville', 'Lyon');
    expect(mockEmployeDataService.setData).toHaveBeenCalledWith('codePostal', '69000');
    expect(router.navigate).toHaveBeenCalledWith(['/formulaire-choix-panier-employe']);
  });
});
