import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilReprogrammationTypePanierComponent } from './profil-reprogrammation-type-panier.component';
import { LogoComponent } from '../logo/logo.component';

describe('ProfilReprogrammationTypePanierComponent', () => {
  let component: ProfilReprogrammationTypePanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationTypePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilReprogrammationTypePanierComponent, LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationTypePanierComponent);
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

  it('should display the selection question', () => {
    const questionText = fixture.debugElement.query(By.css('.text-container p')).nativeElement.textContent.trim();
    expect(questionText).toBe('Choisissez la formule de votre abonnement.');
  });

  it('should display both subscription type buttons with correct text', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.date-button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Panier simple');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('Panier familial');
  });

  it('should navigate to the previous page when "Retour" button is clicked', () => {
    const returnButton = fixture.debugElement.query(By.css('.return-button'));
    expect(returnButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-panier');
  });

  it('should navigate to the next page when "Suivant" button is clicked', () => {
    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    expect(nextButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-nombre-panier');
  });

  it('should apply correct styles to the subscription type buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.date-button'));
  });
});
