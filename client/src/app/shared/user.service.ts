import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernameSource = new BehaviorSubject<string>(''); // Gestion du nom d'utilisateur
  private loggedInSource = new BehaviorSubject<boolean>(false); // Gestion de l'état de connexion

  currentUsername = this.usernameSource.asObservable(); // Observable pour le nom d'utilisateur
  isLoggedIn$ = this.loggedInSource.asObservable(); // Observable pour l'état de connexion

  setUsername(username: string): void {
    this.usernameSource.next(username); // Met à jour le nom d'utilisateur
  }

  setLoggedIn(status: boolean): void {
    this.loggedInSource.next(status); // Met à jour l'état de connexion
  }
}
