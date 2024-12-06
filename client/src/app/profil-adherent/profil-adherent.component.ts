import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'; // Import du service

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrls: ['./profil-adherent.component.scss']
})
export class ProfilAdherentComponent implements OnInit {
  isModalAbonnementOpen: boolean = false;
  isModalLivraisonOpen: boolean = false;
  isModalHistoriquePaiementOpen: boolean = false;
  username: string = ''; // Variable pour stocker le username

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Abonnez-vous pour obtenir le username depuis le service
    this.userService.currentUsername.subscribe(username => {
      this.username = username;
    });
  }

  // Ouvrir les modales
  openModalAbonnement() {
    this.isModalAbonnementOpen = true;
  }

  openModalLivraison() {
    this.isModalLivraisonOpen = true;
  }

  openModalHistoriquePaiement() {
    this.isModalHistoriquePaiementOpen = true;
  }

  // Fermer les modales
  closeModalAbonnement() {
    this.isModalAbonnementOpen = false;
  }

  closeModalLivraison() {
    this.isModalLivraisonOpen = false;
  }

  closeModalHistoriquePaiement() {
    this.isModalHistoriquePaiementOpen = false;
  }
}
