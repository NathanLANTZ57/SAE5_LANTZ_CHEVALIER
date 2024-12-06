import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernameSource = new BehaviorSubject<string>(''); // Initialisé avec une chaîne vide
  currentUsername = this.usernameSource.asObservable();

  setUsername(username: string) {
    this.usernameSource.next(username); // Met à jour le BehaviorSubject
  }
}
