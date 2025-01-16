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

  it('should set and get a value for a given key', () => {
    service.setData('testKey', 'testValue');
    const value = service.getData('testKey');
    expect(value).toBe('testValue');
  });

  it('should log the data when setting a value', () => {
    spyOn(console, 'log');
    service.setData('logKey', 'logValue');
    expect(console.log).toHaveBeenCalledWith('Donnée sauvegardée : logKey =', 'logValue');
  });

  it('should log the data when getting a value', () => {
    service.setData('logKey', 'logValue');
    spyOn(console, 'log');
    service.getData('logKey');
    expect(console.log).toHaveBeenCalledWith('Donnée récupérée : logKey =', 'logValue');
  });

  it('should return undefined for a non-existent key', () => {
    const value = service.getData('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('should get all data as an object', () => {
    service.setData('key1', 'value1');
    service.setData('key2', 'value2');
    const allData = service.getAllData();
    expect(allData).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });

  it('should reset all data', () => {
    service.setData('key1', 'value1');
    service.resetData();
    expect(service.getAllData()).toEqual({});
  });

  it('should overwrite a value for an existing key', () => {
    service.setData('key1', 'initialValue');
    service.setData('key1', 'newValue');
    expect(service.getData('key1')).toBe('newValue');
  });

  it('should return an empty object initially', () => {
    expect(service.getAllData()).toEqual({});
  });
});
