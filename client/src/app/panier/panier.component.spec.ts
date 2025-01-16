import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanierComponent } from './panier.component';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierComponent);
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
    const title = fixture.debugElement.query(By.css('.titre p'));
    expect(title.nativeElement.textContent.trim()).toBe('Nos services');
  });

  it('should display the image header', () => {
    const img = fixture.debugElement.query(By.css('.imgEnTete img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toBe('assets/image_ecran_panier.jpg');
  });

  it('should display the service sections', () => {
    const magasin = fixture.debugElement.query(By.css('.partie_1 h3')).nativeElement.textContent;
    const paniers = fixture.debugElement.query(By.css('.partie_2 h3')).nativeElement.textContent;
    const tarifs = fixture.debugElement.query(By.css('.partie_3 h3')).nativeElement.textContent;

    expect(magasin).toBe('Magasin');
    expect(paniers).toBe('Paniers');
    expect(tarifs).toBe('Tarifs');
  });

  it('should display the "Souscrire un abonnement" button', () => {
    const button = fixture.debugElement.query(By.css('.adherent a'));
    expect(button.nativeElement.textContent.trim()).toBe('Souscrire un abonnement');
    expect(button.nativeElement.getAttribute('routerLink')).toBe('/app-formulaire-panier');
  });

  it('should display the vegetable and fruit tables', () => {
    const tables = fixture.debugElement.queryAll(By.css('table'));
    expect(tables.length).toBeGreaterThan(0);
  });

  it('should display the "Tarifs hors cotisation" text', () => {
    const tarifText = fixture.debugElement.query(By.css('h4')).nativeElement.textContent;
    expect(tarifText).toContain('(hors cotisation 5€)');
  });

  it('should display the pricing details correctly', () => {
    const depotHeader = fixture.debugElement.query(By.css('.depot th')).nativeElement.textContent;
    expect(depotHeader).toContain('Livraison : Dépôt');
  });
});
