import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdherentComponent } from './accueil-adherent.component';

describe('AccueilAdherentComponent', () => {
  let component: AccueilAdherentComponent;
  let fixture: ComponentFixture<AccueilAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilAdherentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
