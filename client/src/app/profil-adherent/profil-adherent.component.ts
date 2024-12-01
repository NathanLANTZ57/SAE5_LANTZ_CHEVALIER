import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrls: ['./profil-adherent.component.scss']
})
export class ProfilAdherentComponent {
  isModalAbonnementOpen: boolean = false;
  isModalLivraisonOpen: boolean = false;
  isModalHistoriquePaiementOpen: boolean = false;

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
