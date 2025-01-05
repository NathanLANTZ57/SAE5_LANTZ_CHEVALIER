import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernameSource = new BehaviorSubject<string>('');
  private loggedInSource = new BehaviorSubject<boolean>(false);

  currentUsername = this.usernameSource.asObservable();
  isLoggedIn$ = this.loggedInSource.asObservable();

  constructor(private http: HttpClient) {}

  setUsername(username: string): void {
    this.usernameSource.next(username);
  }

  getUsername(): string {
    return this.usernameSource.getValue();
  }

  setLoggedIn(status: boolean): void {
    this.loggedInSource.next(status);
  }

  isLoggedIn(): boolean {
    return this.loggedInSource.getValue();
  }

  clearUserData(): void {
    this.usernameSource.next('');
    this.loggedInSource.next(false);
  }

  // Nouvelle méthode pour récupérer l'adresse e-mail en fonction du username
  getUserEmail(username: string): Promise<string> {
    const apiUrl = `http://localhost:3000/api/adherents?username=${encodeURIComponent(username)}`;
    return this.http.get<any>(apiUrl).toPromise().then((user) => {
      if (user && user.email) {
        return user.email;
      }
      throw new Error('Adresse e-mail non trouvée pour cet utilisateur');
    });
  } 
}