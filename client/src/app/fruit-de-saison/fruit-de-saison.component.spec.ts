import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDeSaisonComponent } from './fruit-de-saison.component';

describe('FruitDeSaisonComponent', () => {
  let component: FruitDeSaisonComponent;
  let fixture: ComponentFixture<FruitDeSaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitDeSaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitDeSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
