import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrls: ['./profil-adherent.component.scss'],
})
export class ProfilAdherentComponent implements OnInit {
  isModalAbonnementOpen: boolean = false;
  isModalLivraisonOpen: boolean = false;
  isModalHistoriquePaiementOpen: boolean = false;
  username: string = ''; // Variable pour stocker le username
  adherentData: any = {}; // Stocke les données de l'adhérent

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    // Abonnez-vous pour obtenir le username depuis le service
    this.userService.currentUsername.subscribe((username) => {
      this.username = username;

      // Récupérer l'adresse e-mail de l'utilisateur connecté
      if (this.username) {
        this.userService.getUserEmail(this.username).then(
          (email) => {
            // Appeler l'API pour récupérer les données de l'adhérent
            this.fetchAdherentData(email);
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'adresse e-mail :', error);
          }
        );
      }
    });
  }

  fetchAdherentData(email: string): void {
    const apiUrl = `http://localhost:3000/api/adherentsabonne?email=${encodeURIComponent(email)}`;
    this.http.get(apiUrl).subscribe(
      (data) => {
        console.log('Données récupérées :', data); // Ajoutez ce log
        this.adherentData = data; // Mettez à jour les données affichées dans le profil
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'adhérent :', error);
      }
    );
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
