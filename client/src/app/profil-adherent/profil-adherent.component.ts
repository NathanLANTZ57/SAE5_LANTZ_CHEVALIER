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
  username: string = ''; 
  adherentData: any = {};

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userService.currentUsername.subscribe((username) => {
      this.username = username;

      if (this.username) {
        this.userService.getUserEmail(this.username).then(
          (email) => {
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
        console.log('Données récupérées :', data); 
        this.adherentData = data; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'adhérent :', error);
      }
    );
  }
  
  openModalAbonnement() {
    this.isModalAbonnementOpen = true;
  }

  openModalLivraison() {
    this.isModalLivraisonOpen = true;
  }

  openModalHistoriquePaiement() {
    this.isModalHistoriquePaiementOpen = true;
  }

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
