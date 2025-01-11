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
  role = ''; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Suivre l'état de connexion
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Suivre le rôle
    this.userService.currentRole.subscribe(currentRole => {
      this.role = currentRole;
    });
  }

  checkLoginStatus(): void {
    if (!this.isLoggedIn) {
      alert('Veuillez vous connecter pour accéder à votre profil.');
    }
  }
}
