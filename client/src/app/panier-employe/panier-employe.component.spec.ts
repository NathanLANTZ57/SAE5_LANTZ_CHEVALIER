import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierEmployeComponent } from './panier-employe.component';

describe('PanierEmployeComponent', () => {
  let component: PanierEmployeComponent;
  let fixture: ComponentFixture<PanierEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
