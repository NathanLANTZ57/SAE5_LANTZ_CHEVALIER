import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireModePaiementComponent } from './formulaire-mode-paiement.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireModePaiementComponent', () => {
  let component: FormulaireModePaiementComponent;
  let fixture: ComponentFixture<FormulaireModePaiementComponent>;
  let mockAdherentDataService: any;

  beforeEach(async () => {
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        if (key === 'paiementOption') return 'Annuel';
        return '';
      }),
      setData: jasmine.createSpy('setData')
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulaireModePaiementComponent, LogoComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: AdherentDataService, useValue: mockAdherentDataService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireModePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize paiementOption from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('paiementOption');
    expect(component.paiementOption).toBe('Annuel');
  });

  it('should call setData on AdherentDataService and navigate when onNext is called with a valid option', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.paiementOption = 'Trimestre';
    component.onNext();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('paiementOption', 'Trimestre');
    expect(router.navigate).toHaveBeenCalledWith(['/app-formulaire-iban']);
  });

  it('should display an alert if no paiementOption is selected when onNext is called', () => {
    spyOn(window, 'alert');

    component.paiementOption = '';
    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Veuillez choisir une formule de paiement.');
  });

  it('should render radio buttons for paiement options', () => {
    const radioButtons = fixture.debugElement.queryAll(By.css('.subscriptionOptions input[type="radio"]'));
    expect(radioButtons.length).toBe(3);
    expect(radioButtons[0].nativeElement.value).toBe('Annuel');
    expect(radioButtons[1].nativeElement.value).toBe('Trimestre');
    expect(radioButtons[2].nativeElement.value).toBe('Mensuel');
  });

  it('should update paiementOption when a radio button is selected', () => {
    const radioButton = fixture.debugElement.query(By.css('#trimestre'));
    radioButton.nativeElement.checked = true;
    radioButton.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.paiementOption).toBe('Trimestre');
  });
});