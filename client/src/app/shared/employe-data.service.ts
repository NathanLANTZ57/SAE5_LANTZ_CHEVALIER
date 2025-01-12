import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeDataService {
  private employeData: { [key: string]: any } = {};

  constructor() {}

  setData(key: string, value: any): void {
    console.log(`Donnée sauvegardée : ${key} =`, value);
    this.employeData[key] = value;
  }

  getData(key: string): any {
    const value = this.employeData[key];
    console.log(`Donnée récupérée : ${key} =`, value);
    return value;
  }

  getAllData(): { [key: string]: any } {
    return this.employeData;
  }

  resetData(): void {
    this.employeData = {};
  }
}
