import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireCotisationComponent } from './formulaire-cotisation.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormulaireCotisationComponent', () => {
  let component: FormulaireCotisationComponent;
  let fixture: ComponentFixture<FormulaireCotisationComponent>;
  let mockAdherentDataService: any;

  beforeEach(async () => {
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        if (key === 'cotisationOption') return 'cotisation';
        if (key === 'montantDon') return 10;
        return '';
      }),
      setData: jasmine.createSpy('setData'),
    };

    await TestBed.configureTestingModule({
      declarations: [FormulaireCotisationComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AdherentDataService, useValue: mockAdherentDataService },
      ],
    })
      .overrideComponent(FormulaireCotisationComponent, {
        set: {
          template: `
            <form>
              <input
                type="radio"
                [(ngModel)]="cotisationOption"
                [ngModelOptions]="{ standalone: true }"
                value="cotisation"
                id="cotisation"
              />
              <input
                type="radio"
                [(ngModel)]="cotisationOption"
                [ngModelOptions]="{ standalone: true }"
                value="cotisationDon"
                id="cotisationDon"
              />
              <div *ngIf="cotisationOption === 'cotisationDon'" class="donMontant">
                <input
                  type="number"
                  [(ngModel)]="montantDon"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
              <p class="summary"><strong>{{ totalCotisation }} €</strong></p>
              <button class="btn suivant" (click)="onNext()">Suivant</button>
            </form>
          `,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cotisationOption and montantDon from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith(
      'cotisationOption'
    );
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('montantDon');
    expect(component.cotisationOption).toBe('cotisation');
    expect(component.montantDon).toBe(10);
  });

  it('should calculate totalCotisation correctly for cotisation', () => {
    component.cotisationOption = 'cotisation';
    component.updateCotisation();
    expect(component.totalCotisation).toBe(5);
  });

  it('should calculate totalCotisation correctly for cotisationDon', () => {
    component.cotisationOption = 'cotisationDon';
    component.montantDon = 20;
    component.updateCotisation();
    expect(component.totalCotisation).toBe(25);
  });

  it('should display an alert if montantDon is invalid when onNext is called', () => {
    spyOn(window, 'alert');
    component.cotisationOption = 'cotisationDon';
    component.montantDon = 0;

    component.onNext();

    expect(window.alert).toHaveBeenCalledWith(
      'Veuillez entrer un montant valide pour le don.'
    );
  });

  it('should call setData on AdherentDataService and navigate when onNext is called with valid data', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.cotisationOption = 'cotisation';
    component.montantDon = 0;
    component.totalCotisation = 5;

    component.onNext();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith(
      'cotisationOption',
      'cotisation'
    );
    expect(mockAdherentDataService.setData).toHaveBeenCalledWith(
      'montantDon',
      0
    );
    expect(mockAdherentDataService.setData).toHaveBeenCalledWith(
      'totalCotisation',
      5
    );
    expect(router.navigate).toHaveBeenCalledWith(['/app-formulaire-choix']);
  });


  it('should render the donation input field when cotisationDon is selected', () => {
    component.cotisationOption = 'cotisationDon';
    fixture.detectChanges();

    const donationInput = fixture.debugElement.query(
      By.css('.donMontant input[type="number"]')
    );
    expect(donationInput).toBeTruthy(); // Vérifie que le champ est affiché
  });

  it('should not render the donation input field when cotisation is selected', () => {
    component.cotisationOption = 'cotisation';
    fixture.detectChanges();

    const donationInput = fixture.debugElement.query(
      By.css('.donMontant input[type="number"]')
    );
    expect(donationInput).toBeNull(); // Vérifie que le champ est masqué
  });
});
