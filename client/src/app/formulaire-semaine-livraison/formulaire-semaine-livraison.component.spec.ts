import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireSemaineLivraisonComponent } from './formulaire-semaine-livraison.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from '../logo/logo.component';

describe('FormulaireSemaineLivraisonComponent', () => {
  let component: FormulaireSemaineLivraisonComponent;
  let fixture: ComponentFixture<FormulaireSemaineLivraisonComponent>;
  let mockAdherentDataService: any;

  beforeEach(async () => {
    mockAdherentDataService = {
      getData: jasmine.createSpy('getData').and.callFake((key: string) => {
        if (key === 'selectedWeek') return 3;
        return null;
      }),
      setData: jasmine.createSpy('setData'),
    };

    await TestBed.configureTestingModule({
      declarations: [FormulaireSemaineLivraisonComponent, LogoComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AdherentDataService, useValue: mockAdherentDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireSemaineLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedWeek from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('selectedWeek');
    expect(component.selectedWeek).toEqual(3);
  });

  it('should toggle week selection', () => {
    component.toggleSelection(6);
    expect(component.selectedWeek).toEqual(6);

    component.toggleSelection(6);
    expect(component.selectedWeek).toBeNull();
  });

  it('should not allow selection of week 1 or 52', () => {
    component.toggleSelection(1);
    expect(component.selectedWeek).toBe(3);

    component.toggleSelection(52);
    expect(component.selectedWeek).toBe(3);
  });

  it('should detect selected weeks correctly', () => {
    component.selectedWeek = 3;
    expect(component.isSelected(3)).toBeTrue();
    expect(component.isSelected(7)).toBeFalse();
  });

  it('should save selectedWeek and navigate on valid submission', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.selectedWeek = 5;
    component.onNext();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('selectedWeek', 5);
    expect(router.navigate).toHaveBeenCalledWith(['/app-formulaire-mode-livraison']);
  });

  it('should display an alert if no week is selected', () => {
    spyOn(window, 'alert');

    component.selectedWeek = null;
    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Veuillez sélectionner une semaine.');
  });

  it('should render weeks correctly in the calendar', () => {
    component.initializeWeeks();
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.calendar-table td'));
    expect(cells.length).toBeGreaterThan(0);
  });

  it('should mark selected week with the selected class', () => {
    component.selectedWeek = 3;
    fixture.detectChanges();

    const selectedCells = fixture.debugElement.queryAll(By.css('.calendar-table td.selected'));
    expect(selectedCells.length).toBe(1);
  });

  it('should disable weeks 1 and 52', () => {
    const disabledWeeks = [1, 52];
    disabledWeeks.forEach((week) => {
      expect(component.isDisabled(week)).toBeTrue();
    });
  });
});
