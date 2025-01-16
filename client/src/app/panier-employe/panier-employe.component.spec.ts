import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanierEmployeComponent } from './panier-employe.component';

describe('PanierEmployeComponent', () => {
  let component: PanierEmployeComponent;
  let fixture: ComponentFixture<PanierEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierEmployeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logo = fixture.debugElement.query(By.css('app-logo'));
    expect(logo).toBeTruthy();
  });

  it('should display the title correctly', () => {
    const title = fixture.debugElement.query(By.css('.titre p')).nativeElement.textContent.trim();
    expect(title).toBe('Les conditons et les tarifs');
  });

  it('should display the image header', () => {
    const img = fixture.debugElement.query(By.css('.imgEnTete img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toBe('assets/image_ecran_panier.jpg');
  });

  it('should display the sections for "Paniers solidaire BIO" and "Paniers Simple BIO"', () => {
    const solidaireTitle = fixture.debugElement.query(By.css('.partie_1 h4')).nativeElement.textContent.trim();
    const simpleTitle = fixture.debugElement.query(By.css('.partie_2 h4')).nativeElement.textContent.trim();

    expect(solidaireTitle).toBe('> Paniers solidaire BIO');
    expect(simpleTitle).toBe('> Paniers Simple BIO');
  });

  it('should display the subscription button', () => {
    const button = fixture.debugElement.query(By.css('.employe a'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('Souscrire un abonnement');
    expect(button.nativeElement.getAttribute('routerLink')).toBe('/formulaire-panier-employe');
  });

  it('should display the correct pricing for "Paniers solidaire BIO"', () => {
    const pricingText = fixture.debugElement.query(By.css('.partie_1 h5')).nativeElement.textContent.trim();
    expect(pricingText).toBe('Le montant du prélèvement mensuel est de 5 euros.');
  });

  it('should display the correct pricing for "Paniers Simple BIO"', () => {
    const pricingText = fixture.debugElement.query(By.css('.partie_2 h5')).nativeElement.textContent.trim();
    expect(pricingText).toBe('Le montant du prélèvement mensuel est de 20 euros.');
  });

  it('should display the description paragraphs correctly', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.lesPaniers p'));
    expect(paragraphs.length).toBeGreaterThan(0);

    const sampleParagraph = paragraphs[0].nativeElement.textContent.trim();
    expect(sampleParagraph).toContain('Je m’engage à prendre mon panier solidaire de légume chaque semaine.');
  });
});
