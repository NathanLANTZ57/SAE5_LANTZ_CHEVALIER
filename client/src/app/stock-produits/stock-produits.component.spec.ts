import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProduitsComponent } from './stock-produits.component';

describe('StockProduitsComponent', () => {
  let component: StockProduitsComponent;
  let fixture: ComponentFixture<StockProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
