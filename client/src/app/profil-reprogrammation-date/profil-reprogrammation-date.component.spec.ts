import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilReprogrammationDateComponent } from './profil-reprogrammation-date.component';

describe('ProfilReprogrammationDateComponent', () => {
  let component: ProfilReprogrammationDateComponent;
  let fixture: ComponentFixture<ProfilReprogrammationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilReprogrammationDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationDateComponent);
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

  it('should include the delivery calendar component', () => {
    const calendarComponent = fixture.debugElement.query(By.css('app-calendrier-livraison'));
    expect(calendarComponent).toBeTruthy();
  });

  it('should navigate to the adherent profile when "Retour" button is clicked', () => {
    const returnButton = fixture.debugElement.query(By.css('.return-button'));
    expect(returnButton.attributes['routerLink']).toBe('/app-profil-adherent');
  });

  it('should navigate to the reprogramming page when "Suivant" button is clicked', () => {
    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    expect(nextButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-panier');
  });

  it('should select a date and log it', () => {
    spyOn(console, 'log');
    const testDate = '2025-01-20';

    component.selectDate(testDate);

    expect(component.selectedDate).toBe(testDate);
    expect(console.log).toHaveBeenCalledWith('Date sélectionnée :', testDate);
  });
});
