import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Source pour stocker l'adresse e-mail de l'utilisateur connecté
  private usernameSource = new BehaviorSubject<string>(''); 
  // Source pour stocker l'état de connexion (connecté/déconnecté)
  private loggedInSource = new BehaviorSubject<boolean>(false);

  // Observables exposés
  currentUsername = this.usernameSource.asObservable(); 
  isLoggedIn$ = this.loggedInSource.asObservable();

  // Met à jour l'adresse e-mail de l'utilisateur
  setUsername(email: string): void {
    this.usernameSource.next(email);
  }

  // Récupère l'adresse e-mail de l'utilisateur connecté
  getUsername(): string {
    return this.usernameSource.getValue(); // Retourne la valeur actuelle
  }

  // Met à jour l'état de connexion (connecté/déconnecté)
  setLoggedIn(status: boolean): void {
    this.loggedInSource.next(status);
  }

  // Vérifie si l'utilisateur est actuellement connecté
  isLoggedIn(): boolean {
    return this.loggedInSource.getValue(); // Retourne la valeur actuelle
  }

  // Réinitialise les données utilisateur (lors de la déconnexion)
  clearUserData(): void {
    this.usernameSource.next('');
    this.loggedInSource.next(false);
  }
}
