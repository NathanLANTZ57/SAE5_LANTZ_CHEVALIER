import { TestBed } from '@angular/core/testing';

import { AdherentDataService } from './adherent-data.service';

describe('AdherentDataService', () => {
  let service: AdherentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
