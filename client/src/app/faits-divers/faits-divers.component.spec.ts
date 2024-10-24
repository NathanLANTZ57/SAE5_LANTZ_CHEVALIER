import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitsDiversComponent } from './faits-divers.component';

describe('FaitsDiversComponent', () => {
  let component: FaitsDiversComponent;
  let fixture: ComponentFixture<FaitsDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitsDiversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaitsDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
