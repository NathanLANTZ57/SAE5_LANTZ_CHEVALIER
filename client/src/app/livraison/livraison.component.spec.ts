import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LivraisonComponent } from './livraison.component';
import { LogoComponent } from '../logo/logo.component';
import { CalendrierLivraisonComponent } from '../calendrier-livraison/calendrier-livraison.component';
import { TrajetLivraisonComponent } from '../trajet-livraison/trajet-livraison.component';

describe('LivraisonComponent', () => {
  let component: LivraisonComponent;
  let fixture: ComponentFixture<LivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LivraisonComponent, 
        LogoComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonComponent);
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
    expect(title.nativeElement.textContent.trim()).toBe('Calendrier des livraisons');
  });

  it('should include the calendar component', () => {
    const calendarComponent = fixture.debugElement.query(By.css('app-calendrier-livraison'));
    expect(calendarComponent).toBeTruthy();
  });

  it('should include the delivery route component', () => {
    const routeComponent = fixture.debugElement.query(By.css('app-trajet-livraison'));
    expect(routeComponent).toBeTruthy();
  });

  it('should display the header image', () => {
    const img = fixture.debugElement.query(By.css('.imgEnTete img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toBe('assets/dates-livraison.jpg');
  });
});
