import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdherentDataService {
  private adherentData: any = {};

  constructor() {}

  // Mettre à jour une donnée
  setData(key: string, value: any): void {
    this.adherentData[key] = value;
  }

  // Récupérer une donnée spécifique
  getData(key: string): any {
    return this.adherentData[key];
  }

  // Récupérer toutes les données
  getAllData(): any {
    return this.adherentData;
  }

  // Réinitialiser toutes les données
  resetData(): void {
    this.adherentData = {};
  }
}
