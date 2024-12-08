import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;       // Gère l'ouverture de la barre latérale
  showLoginModal = false;      // Gère l'affichage de la modale de connexion
  username = '';               // Nom d'utilisateur pour la connexion
  password = '';               // Mot de passe pour la connexion
  menuTitle = 'Menu';          // Titre par défaut de la barre latérale fermée
  menuTitleOuvert = 'Tableau de bord';  // Titre de la barre latérale ouverte

  // Définition des éléments du menu de la barre latérale
  menuItems = [
    { link: '/', label: 'Accueil', icon: 'assets/accueil.png' },
    { link: '/panier', label: 'Panier', icon: 'assets/panier.png' },
    { link: '/livraison', label: 'Livraison', icon: 'assets/camion.png' },
    { link: '/faits-divers', label: 'Faits Divers', icon: 'assets/faitsDivers.png' },
    { link: '/profil', label: 'Profil', icon: 'assets/pageprofil.png' },
  ];
  role: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Fonction pour basculer l'ouverture de la barre latérale
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Fonction pour ouvrir la modale de connexion
  openModal() {
    this.showLoginModal = true;
  }

  // Fonction pour fermer la modale de connexion
  closeModal() {
    this.showLoginModal = false;
  }

  // Fonction de connexion appelée lors de la soumission du formulaire
  onLogin() {
    const loginData = { name: this.username, password: this.password };
  
    // URL du backend : change 'http://localhost:3000' en 'http://api:3000' si nécessaire (Docker)
    this.http.post('http://localhost:3000/api/login/adherent/connect', loginData)
      .subscribe(
        (response: any) => {
          console.log('Connexion réussie', response);
  
          // Exemple d'action après connexion
          if (response.adherent) {
            alert(`Bienvenue, ${response.adherent.name}!`);
            this.role = response.adherent.role || 'Adhérent';
          }
  
          this.closeModal();
          this.username = '';
          this.password = '';
        },
        error => {
          console.error('Erreur de connexion', error);
  
          if (error.status === 401) {
            alert('Nom ou mot de passe incorrect.');
          } else {
            alert('Erreur interne du serveur. Veuillez réessayer plus tard.');
          }
        }
      );
  }  
}
