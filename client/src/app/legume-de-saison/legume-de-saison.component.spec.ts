import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegumeDeSaisonComponent } from './legume-de-saison.component';

describe('LegumeDeSaisonComponent', () => {
  let component: LegumeDeSaisonComponent;
  let fixture: ComponentFixture<LegumeDeSaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegumeDeSaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegumeDeSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
