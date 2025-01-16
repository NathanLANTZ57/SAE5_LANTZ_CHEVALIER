import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandeClientComponent } from './commande-client.component';
import { By } from '@angular/platform-browser';
import { LogoComponent } from '../logo/logo.component';

describe('CommandeClientComponent', () => {
  let component: CommandeClientComponent;
  let fixture: ComponentFixture<CommandeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeClientComponent, LogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the commandesAVenir section', () => {
    const commandesAVenirSection = fixture.debugElement.query(By.css('.commandeAVenir'));
    expect(commandesAVenirSection).toBeTruthy();
  });

  it('should render the commandesReprogrammees section', () => {
    const commandesReprogrammeesSection = fixture.debugElement.query(By.css('.commandeReprogramme'));
    expect(commandesReprogrammeesSection).toBeTruthy();
  });

  it('should open the modal when openModal is called', () => {
    component.openModal();
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modal).toBeTruthy();
  });

  it('should close the modal when closeModal is called', () => {
    component.openModal();
    fixture.detectChanges();
    component.closeModal();
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modal).toBeNull();
  });

  it('should add a new commande when addCommande is called', () => {
    component.newCommande = {
      jour: '',
      client: 'Test Client',
      societe: 'Test Société',
      lieu: 'Test Lieu',
      produit: 'Test Produit',
      type_abon: 'Test Abonnement',
      date: '2023-12-31',
      nouvelleDate: ''
    };

    component.addCommande();
    fixture.detectChanges();

    expect(component.commandesAutres.length).toBeGreaterThan(0);
    expect(component.commandesAutres[component.commandesAutres.length - 1].client).toBe('Test Client');
  });

  it('should reset newCommande after closing the modal', () => {
    component.newCommande.client = 'Test Client';
    component.closeModal();

    expect(component.newCommande.client).toBe('');
  });
});
