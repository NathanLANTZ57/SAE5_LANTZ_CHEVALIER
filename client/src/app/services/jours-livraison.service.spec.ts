import { TestBed } from '@angular/core/testing';

import { JoursLivraisonService } from './jours-livraison.service';

describe('JoursLivraisonService', () => {
  let service: JoursLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoursLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
