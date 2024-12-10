import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-accueil-adherent',
  templateUrl: './accueil-adherent.component.html',
  styleUrls: ['./accueil-adherent.component.scss']
})
export class AccueilAdherentComponent implements OnInit {
  background = 'assets/image_arbre.jpg';
  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status; // Suivre l'état de connexion
    });
  }

  checkLoginStatus(): void {
    if (!this.isLoggedIn) {
      alert('Veuillez vous connecter pour accéder à votre profil.');
    }
  }
}
