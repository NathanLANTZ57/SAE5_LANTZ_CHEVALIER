import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeliveryDay {
  id?: number; // ID optionnel pour les ajouts multiples
  date: string;
  tournee: string;
  frequence: string;
}

@Injectable({
  providedIn: 'root',
})
export class JoursLivraisonService {
  private readonly apiUrl = 'http://localhost:3000/api/jours-livraison';

  constructor(private http: HttpClient) {}

  /**
   * Récupère les jours de livraison pour une année et un mois donnés.
   * @param year L'année
   * @param month Le mois (1 pour janvier, 12 pour décembre)
   * @returns Observable<DeliveryDay[]>
   */
  getJoursLivraison(year: number, month: number): Observable<DeliveryDay[]> {
    return this.http.get<DeliveryDay[]>(`${this.apiUrl}?year=${year}&month=${month}`);
  }

  /**
   * Ajoute un jour de livraison.
   * @param data Les données du jour de livraison (date, tournée, fréquence)
   * @returns Observable<DeliveryDay>
   */
  addJourLivraison(data: DeliveryDay): Observable<DeliveryDay> {
    return this.http.post<DeliveryDay>(this.apiUrl, data);
  }

  /**
   * Ajoute plusieurs jours de livraison en une seule requête.
   * @param jours Les jours de livraison à ajouter
   * @returns Observable<void>
   */
  addMultipleJoursLivraison(jours: DeliveryDay[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk`, jours);
  }

  /**
   * Supprime un jour de livraison.
   * @param id L'ID du jour de livraison à supprimer
   * @returns Observable<void>
   */
  deleteJourLivraison(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Modifie un jour de livraison.
   * @param id L'ID du jour de livraison à modifier
   * @param data Les données modifiées (date, tournée, fréquence)
   * @returns Observable<DeliveryDay>
   */
  updateJourLivraison(id: number, data: Partial<DeliveryDay>): Observable<DeliveryDay> {
    return this.http.patch<DeliveryDay>(`${this.apiUrl}/${id}`, data);
  }
}
