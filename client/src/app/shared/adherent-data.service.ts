import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdherentDataService {
  private adherentData: any = {};

  constructor() {}

  setData(key: string, value: any): void {
    this.adherentData[key] = value;
  }

  getData(key: string): any {
    return this.adherentData[key];
  }

  getAllData(): any {
    return this.adherentData;
  }

  resetData(): void {
    this.adherentData = {};
  }
}
