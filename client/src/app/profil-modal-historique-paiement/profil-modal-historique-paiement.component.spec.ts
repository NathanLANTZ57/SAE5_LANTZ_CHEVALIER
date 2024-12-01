import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilModalHistoriquePaiementComponent } from './profil-modal-historique-paiement.component';

describe('ProfilModalHistoriquePaiementComponent', () => {
  let component: ProfilModalHistoriquePaiementComponent;
  let fixture: ComponentFixture<ProfilModalHistoriquePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilModalHistoriquePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalHistoriquePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
