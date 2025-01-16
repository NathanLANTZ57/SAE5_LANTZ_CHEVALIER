import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JoursLivraisonService {
  private apiUrl = 'http://localhost:3000/api/jours-livraison';

  constructor(private http: HttpClient) {}

  getJoursLivraison(year: number, month: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?year=${year}&month=${month}`);
  }

  addJourLivraison(data: { date: string; tournee: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteJourLivraison(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
