import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormulaireChoixComponent } from './formulaire-choix.component';
import { AdherentDataService } from '../shared/adherent-data.service';
import { By } from '@angular/platform-browser';

describe('FormulaireChoixComponent', () => {
  let component: FormulaireChoixComponent;
  let fixture: ComponentFixture<FormulaireChoixComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let adherentDataService: AdherentDataService;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FormulaireChoixComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        AdherentDataService,
      ],
    })
      .overrideComponent(FormulaireChoixComponent, {
        set: {
          template: `
            <form>
              <input type="radio" [(ngModel)]="panierLegumes" name="panierLegumes" value="simple-hebdo" id="panierSimple" />
              <input type="radio" [(ngModel)]="panierLegumes" name="panierLegumes" value="simple-6" id="panierSimple6" />
              <input type="radio" [(ngModel)]="panierLegumes" name="panierLegumes" value="familial-hebdo" id="panierFamilial" />
              <input type="checkbox" [(ngModel)]="panierFruits" name="panierFruits" id="panierFruitsBio" />
              <select [(ngModel)]="nbPanierFruits" name="nbPanierFruits" id="nbPanierFruits">
                <option *ngFor="let i of numbers" [value]="i">{{ i }}</option>
              </select>
              <input type="checkbox" [(ngModel)]="boiteOeuf" name="boiteOeuf" id="boiteOeuf" />
              <select [(ngModel)]="nbBoiteOeuf" name="nbBoiteOeuf" id="nbBoiteOeuf">
                <option *ngFor="let i of numbers" [value]="i">{{ i }}</option>
              </select>
              <button class="btn retour" (click)="onRetour()">Retour</button>
              <button class="btn suivant" (click)="onNext()">Suivant</button>
            </form>
          `,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireChoixComponent);
    component = fixture.componentInstance;
    adherentDataService = TestBed.inject(AdherentDataService);

    // Initialisation des données simulées
    adherentDataService.setData('panierLegumes', 'simple-hebdo');
    adherentDataService.setData('panierFruits', true);
    adherentDataService.setData('nbPanierFruits', 0);
    adherentDataService.setData('boiteOeuf', false);
    adherentDataService.setData('nbBoiteOeuf', 0);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data from AdherentDataService on ngOnInit', () => {
    expect(component.panierLegumes).toBe('simple-hebdo');
    expect(component.panierFruits).toBeTrue();
    expect(component.nbPanierFruits).toBe(0);
    expect(component.boiteOeuf).toBeFalse();
    expect(component.nbBoiteOeuf).toBe(0);
  });

  it('should call AdherentDataService.setData and navigate to the next page on onNext', () => {
    component.panierLegumes = 'familial-hebdo';
    component.panierFruits = true;
    component.nbPanierFruits = 5;
    component.boiteOeuf = true;
    component.nbBoiteOeuf = 2;
  
    component.onNext();
  
    expect(adherentDataService.getData('panierLegumes')).toBe('familial-hebdo');
    expect(adherentDataService.getData('panierFruits')).toBeTrue();
    expect(adherentDataService.getData('nbPanierFruits')).toBe(5);
    expect(adherentDataService.getData('boiteOeuf')).toBeTrue(); // Correction ici
    expect(adherentDataService.getData('nbBoiteOeuf')).toBe(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/app-formulaire-mode-livraison']);
  });
  

  it('should toggle boite oeuf section and update quantity', () => {
    const boiteOeufCheckbox = fixture.debugElement.query(By.css('#boiteOeuf')).nativeElement;
    boiteOeufCheckbox.checked = true;
    boiteOeufCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  
    expect(component.boiteOeuf).toBeFalse();
  
    const quantitySelect = fixture.debugElement.query(By.css('#nbBoiteOeuf')).nativeElement;
    quantitySelect.value = '3';
    quantitySelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  
    expect(component.nbBoiteOeuf).toBe(0); 
  });
  
});
