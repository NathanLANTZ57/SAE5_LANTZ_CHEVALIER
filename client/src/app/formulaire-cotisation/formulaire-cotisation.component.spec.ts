import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCotisationComponent } from './formulaire-cotisation.component';

describe('FormulaireCotisationComponent', () => {
  let component: FormulaireCotisationComponent;
  let fixture: ComponentFixture<FormulaireCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCotisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
