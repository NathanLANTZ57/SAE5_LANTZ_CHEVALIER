import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierLivraisonComponent } from './calendrier-livraison.component';

describe('CalendrierLivraisonComponent', () => {
  let component: CalendrierLivraisonComponent;
  let fixture: ComponentFixture<CalendrierLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
