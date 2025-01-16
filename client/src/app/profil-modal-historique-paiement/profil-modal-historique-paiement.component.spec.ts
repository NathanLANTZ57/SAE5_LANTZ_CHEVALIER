import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilModalHistoriquePaiementComponent } from './profil-modal-historique-paiement.component';
import { LogoComponent } from '../logo/logo.component';

describe('ProfilModalHistoriquePaiementComponent', () => {
  let component: ProfilModalHistoriquePaiementComponent;
  let fixture: ComponentFixture<ProfilModalHistoriquePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilModalHistoriquePaiementComponent, LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalHistoriquePaiementComponent);
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

  it('should display a list of payments with correct data', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const payments = fixture.debugElement.queryAll(By.css('.paiement'));
    expect(payments.length).toBe(3);

    expect(payments[0].nativeElement.textContent.trim()).toContain('Mardi 8/10/2024');
    expect(payments[0].nativeElement.textContent.trim()).toContain('Validé');
    expect(payments[1].nativeElement.textContent.trim()).toContain('Mardi 8/10/2024');
    expect(payments[1].nativeElement.textContent.trim()).toContain('Validé');
    expect(payments[2].nativeElement.textContent.trim()).toContain('Mardi 8/10/2024');
    expect(payments[2].nativeElement.textContent.trim()).toContain('Validé');
  });

  it('should apply the "valid" class to valid payment statuses', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const validStatusElements = fixture.debugElement.queryAll(By.css('.status.valid'));
    expect(validStatusElements.length).toBe(3);

    validStatusElements.forEach((statusElement) => {
      expect(statusElement.nativeElement.textContent.trim()).toBe('Validé');
    });
  });
});
