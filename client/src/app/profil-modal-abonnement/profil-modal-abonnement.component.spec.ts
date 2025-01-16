import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfilModalAbonnementComponent } from './profil-modal-abonnement.component';

describe('ProfilModalAbonnementComponent', () => {
  let component: ProfilModalAbonnementComponent;
  let fixture: ComponentFixture<ProfilModalAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilModalAbonnementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalAbonnementComponent);
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

  it('should display correct subscription details in the modal', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const panierDetails = fixture.debugElement.queryAll(By.css('.panier span'));
    expect(panierDetails.length).toBe(3);
    expect(panierDetails[0].nativeElement.textContent.trim()).toBe(
      'Panier légumes Bio : Livraison à domicile, tous les mardis'
    );
    expect(panierDetails[1].nativeElement.textContent.trim()).toBe(
      'Panier fruits Bio : Livraison à domicile, tous les mardis'
    );
    expect(panierDetails[2].nativeElement.textContent.trim()).toBe(
      'Boîte de 6 œufs : Livraison à domicile, tous les mardis'
    );
  });

  it('should have a "Signaler une absence" link with correct routerLink', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const absenceButton = fixture.debugElement.query(By.css('.absence-button'));
    expect(absenceButton).toBeTruthy();
    expect(absenceButton.attributes['routerLink']).toBe('/app-profil-reprogrammation-date');
  });
});
