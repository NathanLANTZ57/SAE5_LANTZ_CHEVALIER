import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilModalLivraisonComponent } from './profil-modal-livraison.component';

describe('ProfilModalLivraisonComponent', () => {
  let component: ProfilModalLivraisonComponent;
  let fixture: ComponentFixture<ProfilModalLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilModalLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilModalLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
