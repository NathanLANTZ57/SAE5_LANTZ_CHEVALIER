import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilModalLivraisonComponent } from './profil-modal-livraison.component';
import { LogoComponent } from '../logo/logo.component';

describe('ProfilModalLivraisonComponent', () => {
  let component: ProfilModalLivraisonComponent;
  let fixture: ComponentFixture<ProfilModalLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilModalLivraisonComponent, LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display modal when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal-container'));
    expect(modalElement).toBeTruthy();
  });

  it('should not display modal when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal-container'));
    expect(modalElement).toBeNull();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.isOpen = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    closeButton.nativeElement.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should display a list of deliveries with correct data', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const deliveries = fixture.debugElement.queryAll(By.css('.livraison'));
    expect(deliveries.length).toBe(4);

    expect(deliveries[0].nativeElement.textContent.trim()).toContain('Mardi 8/10/2024');
    expect(deliveries[0].nativeElement.textContent.trim()).toContain('Validé');
    expect(deliveries[1].nativeElement.textContent.trim()).toContain('Mardi 15/10/2024');
    expect(deliveries[1].nativeElement.textContent.trim()).toContain('Validé');
    expect(deliveries[2].nativeElement.textContent.trim()).toContain('Mardi 22/10/2024');
    expect(deliveries[2].nativeElement.textContent.trim()).toContain('Validé');
    expect(deliveries[3].nativeElement.textContent.trim()).toContain('Mardi 29/10/2024');
    expect(deliveries[3].nativeElement.textContent.trim()).toContain('Validé');
  });

  it('should display a "Signaler une absence" button with correct router link', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const absenceButton = fixture.debugElement.query(By.css('.absence-button'));
    expect(absenceButton).toBeTruthy();
    expect(absenceButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-date');
  });
});
