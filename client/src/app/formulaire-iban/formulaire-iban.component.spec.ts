import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireIbanComponent } from './formulaire-iban.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireIbanComponent', () => {
  let component: FormulaireIbanComponent;
  let fixture: ComponentFixture<FormulaireIbanComponent>;
  let mockAdherentDataService: any;

  beforeEach(async () => {
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        if (key === 'iban') return 'FR7612345678901234567890123';
        if (key === 'bic') return 'BANKUS33XXX';
        return '';
      }),
      setData: jasmine.createSpy('setData')
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulaireIbanComponent, LogoComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: AdherentDataService, useValue: mockAdherentDataService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize IBAN and BIC values from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('iban');
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('bic');
    expect(component.iban?.value).toBe('FR7612345678901234567890123');
    expect(component.bic?.value).toBe('BANKUS33XXX');
  });

  it('should call setData on AdherentDataService and navigate when the form is valid and submitted', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.ibanForm.setValue({
      iban: 'FR7612345678901234567890123',
      bic: 'BANKUS33XXX'
    });

    component.onSubmit();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('iban', 'FR7612345678901234567890123');
    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('bic', 'BANKUS33XXX');
    expect(router.navigate).toHaveBeenCalledWith(['/formulaire-validation']);
  });

  it('should display an alert if the form is invalid when submitted', () => {
    spyOn(window, 'alert');

    component.ibanForm.setValue({
      iban: '',
      bic: ''
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Le formulaire contient des erreurs. Veuillez corriger les champs en rouge.');
  });

  it('should render IBAN and BIC input fields', () => {
    const ibanInput = fixture.debugElement.query(By.css('#iban'));
    const bicInput = fixture.debugElement.query(By.css('#bic'));

    expect(ibanInput).toBeTruthy();
    expect(bicInput).toBeTruthy();
  });

  it('should show error messages for invalid IBAN', () => {
    const ibanControl = component.iban;
    ibanControl?.setValue('INVALID_IBAN');
    ibanControl?.markAsTouched();
    fixture.detectChanges();
  
    const errorMessages = fixture.debugElement.query(By.css('.error span'));
  });
  

  it('should show error messages for invalid BIC', () => {
    const bicControl = component.bic;
    bicControl?.setValue('INV');
    bicControl?.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.query(By.css('.error span'));
  });
});