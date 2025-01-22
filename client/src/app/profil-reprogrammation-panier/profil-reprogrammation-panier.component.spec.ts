import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilReprogrammationPanierComponent } from './profil-reprogrammation-panier.component';
import { LogoComponent } from '../logo/logo.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ProfilReprogrammationPanierComponent', () => {
  let component: ProfilReprogrammationPanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilReprogrammationPanierComponent, LogoComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('app-logo'));
    expect(logoElement).toBeTruthy();
  });

  it('should display the header image and text', () => {
    const headerImage = fixture.debugElement.query(By.css('.imgEnTete img'));
    const headerText = fixture.debugElement.query(By.css('.containerHeader p'));

    expect(headerImage).toBeTruthy();
    expect(headerImage.nativeElement.src).toContain('assets/image_date_absent.png');
    expect(headerImage.nativeElement.alt).toBe('Accueil');
    expect(headerText.nativeElement.textContent.trim()).toBe('Absent ?');
  });

  it('should display the question text', () => {
    const questionText = fixture.debugElement.query(By.css('.text-container p'));
    expect(questionText.nativeElement.textContent.trim()).toBe(
      'Quels sont les paniers que vous souhaitez faire livrer un autre jour ?'
    );
  });

  it('should display all buttons for panier types', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.dates-container .date-button'));

    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Panier de légumes BIO');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('Panier de fruit BIO');
    expect(buttons[2].nativeElement.textContent.trim()).toBe("Boite d'œuf");
  });

  it('should display the navigation buttons', () => {
    const returnButton = fixture.debugElement.query(By.css('.return-button'));
    const nextButton = fixture.debugElement.query(By.css('.next-button'));

    expect(returnButton).toBeTruthy();
    expect(returnButton.nativeElement.textContent.trim()).toBe('Retour');
    expect(returnButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-date');

    expect(nextButton).toBeTruthy();
    expect(nextButton.nativeElement.textContent.trim()).toBe('Suivant');
    expect(nextButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-type-panier');
  });

  it('should navigate to the correct page on return button click', () => {
    const returnButton = fixture.debugElement.query(By.css('.return-button'));
    returnButton.nativeElement.click();
    fixture.detectChanges();

    expect(returnButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-date');
  });

  it('should navigate to the correct page on next button click', () => {
    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    nextButton.nativeElement.click();
    fixture.detectChanges();

    expect(nextButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-type-panier');
  });
});
