import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilReprogrammationNombrePanierComponent } from './profil-reprogrammation-nombre-panier.component';

describe('ProfilReprogrammationNombrePanierComponent', () => {
  let component: ProfilReprogrammationNombrePanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationNombrePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilReprogrammationNombrePanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationNombrePanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
