import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilReprogrammationDateComponent } from './profil-reprogrammation-date.component';

describe('ProfilReprogrammationDateComponent', () => {
  let component: ProfilReprogrammationDateComponent;
  let fixture: ComponentFixture<ProfilReprogrammationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilReprogrammationDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilReprogrammationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
