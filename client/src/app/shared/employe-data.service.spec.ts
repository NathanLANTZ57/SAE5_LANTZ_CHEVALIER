import { TestBed } from '@angular/core/testing';

import { EmployeDataService } from './employe-data.service';

describe('EmployeDataService', () => {
  let service: EmployeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
