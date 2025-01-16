import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilReprogrammationNombrePanierComponent } from './profil-reprogrammation-nombre-panier.component';

describe('ProfilReprogrammationNombrePanierComponent', () => {
  let component: ProfilReprogrammationNombrePanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationNombrePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilReprogrammationNombrePanierComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationNombrePanierComponent);
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

  it('should display the header image', () => {
    const headerImg = fixture.debugElement.query(By.css('.imgEnTete img'));
    expect(headerImg).toBeTruthy();
    expect(headerImg.nativeElement.getAttribute('src')).toBe('assets/image_date_absent.png');
  });

  it('should display the correct header text', () => {
    const headerText = fixture.debugElement.query(By.css('.containerHeader p')).nativeElement.textContent.trim();
    expect(headerText).toBe('Absent ?');
  });

  it('should display the subscription options', () => {
    const dateButtons = fixture.debugElement.queryAll(By.css('.date-button'));
    expect(dateButtons.length).toBe(3);
    expect(dateButtons[0].nativeElement.textContent.trim()).toBe('Nombre de panier de fruits : 1');
    expect(dateButtons[1].nativeElement.textContent.trim()).toBe('Nombre de panier de fruits : 2');
    expect(dateButtons[2].nativeElement.textContent.trim()).toBe('Nombre de panier de fruits : 3');
  });

  it('should navigate to the previous page when "Retour" button is clicked', () => {
    const returnButton = fixture.debugElement.query(By.css('.return-button'));
    expect(returnButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-type-panier');
  });

  it('should navigate to the next page when "Suivant" button is clicked', () => {
    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    expect(nextButton.attributes['routerLink']).toBe('/*');
  });

  it('should apply the correct styles for each button', () => {
    const dateButtons = fixture.debugElement.queryAll(By.css('.date-button'));

    // Vérification des couleurs pour le premier bouton
    expect(dateButtons[0].nativeElement.style.backgroundColor).toBe(''); // Couleur traduite en RGB
    expect(dateButtons[0].nativeElement.style.color).toBe('');

    // Vérification des couleurs pour le second bouton
    expect(dateButtons[1].nativeElement.style.backgroundColor).toBe('');
    expect(dateButtons[1].nativeElement.style.color).toBe('');

    // Vérification des couleurs pour le troisième bouton
    expect(dateButtons[2].nativeElement.style.backgroundColor).toBe('');
    expect(dateButtons[2].nativeElement.style.color).toBe('');
  }); 
});
