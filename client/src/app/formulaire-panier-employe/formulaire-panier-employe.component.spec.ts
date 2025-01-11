import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePanierEmployeComponent } from './formulaire-panier-employe.component';

describe('FormulairePanierEmployeComponent', () => {
  let component: FormulairePanierEmployeComponent;
  let fixture: ComponentFixture<FormulairePanierEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulairePanierEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePanierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
