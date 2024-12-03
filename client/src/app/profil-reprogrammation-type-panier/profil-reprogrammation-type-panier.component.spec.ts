import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilReprogrammationTypePanierComponent } from './profil-reprogrammation-type-panier.component';

describe('ProfilReprogrammationTypePanierComponent', () => {
  let component: ProfilReprogrammationTypePanierComponent;
  let fixture: ComponentFixture<ProfilReprogrammationTypePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilReprogrammationTypePanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationTypePanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
