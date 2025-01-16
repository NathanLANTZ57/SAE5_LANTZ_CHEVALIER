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
      getData: jasmine.createSpy('getData').and.returnValue([3, 5, 10]),
      setData: jasmine.createSpy('setData')
    };

    await TestBed.configureTestingModule({
      declarations: [ FormulaireSemaineLivraisonComponent, LogoComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AdherentDataService, useValue: mockAdherentDataService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireSemaineLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedWeeks from AdherentDataService', () => {
    expect(mockAdherentDataService.getData).toHaveBeenCalledWith('selectedWeeks');
    expect(component.selectedWeeks).toEqual([3, 5, 10]);
  });

  it('should toggle week selection', () => {
    component.toggleSelection(6);
    expect(component.selectedWeeks).toContain(6);

    component.toggleSelection(6);
    expect(component.selectedWeeks).not.toContain(6);
  });

  it('should detect selected weeks correctly', () => {
    expect(component.isSelected(3)).toBeTrue();
    expect(component.isSelected(7)).toBeFalse();
  });

  it('should save selectedWeeks and navigate on valid submission', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.selectedWeeks = [1, 2, 3];
    component.onNext();

    expect(mockAdherentDataService.setData).toHaveBeenCalledWith('selectedWeeks', [1, 2, 3]);
    expect(router.navigate).toHaveBeenCalledWith(['/app-formulaire-mode-livraison']);
  });

  it('should display an alert if no weeks are selected', () => {
    spyOn(window, 'alert');

    component.selectedWeeks = [];
    component.onNext();

    expect(window.alert).toHaveBeenCalledWith('Veuillez sélectionner au moins une semaine.');
  });

  it('should render weeks correctly in the calendar', () => {
    component.initializeWeeks();
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.calendar-table td'));
    expect(cells.length).toBeGreaterThan(0);
  });

  it('should mark selected weeks with the selected class', () => {
    component.selectedWeeks = [2, 4];
    fixture.detectChanges();

    const selectedCells = fixture.debugElement.queryAll(By.css('.calendar-table td.selected'));
    expect(selectedCells.length).toBe(24);
  });
});
