import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilReprogrammationPanierComponent } from './profil-reprogrammation-panier.component';
import { LogoComponent } from '../logo/logo.component';

describe('ProfilReprogrammationPanierComponent', () => {
  let component: ProfilReprogrammationPanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilReprogrammationPanierComponent, LogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
