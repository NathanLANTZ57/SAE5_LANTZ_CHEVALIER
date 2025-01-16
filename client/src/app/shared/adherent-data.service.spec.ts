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

  it('should set and get a value for a given key', () => {
    service.setData('testKey', 'testValue');
    const value = service.getData('testKey');
    expect(value).toBe('testValue');
  });

  it('should return undefined for a key that does not exist', () => {
    const value = service.getData('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('should get all data correctly', () => {
    service.setData('key1', 'value1');
    service.setData('key2', 'value2');
    const allData = service.getAllData();
    expect(allData).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });

  it('should reset all data correctly', () => {
    service.setData('key1', 'value1');
    service.resetData();
    const allData = service.getAllData();
    expect(allData).toEqual({});
  });

  it('should overwrite an existing key with a new value', () => {
    service.setData('key1', 'initialValue');
    service.setData('key1', 'newValue');
    const value = service.getData('key1');
    expect(value).toBe('newValue');
  });

  it('should return an empty object initially when fetching all data', () => {
    const allData = service.getAllData();
    expect(allData).toEqual({});
  });
});
