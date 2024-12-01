import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilModalAbonnementComponent } from './profil-modal-abonnement.component';

describe('ProfilModalAbonnementComponent', () => {
  let component: ProfilModalAbonnementComponent;
  let fixture: ComponentFixture<ProfilModalAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilModalAbonnementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
