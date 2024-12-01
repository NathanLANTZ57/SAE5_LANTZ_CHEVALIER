import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  showLoginModal = false;
  isLoggedIn = false;
  username = '';
  password = '';
  role = ''; // Peut être "adherent", "employe", ou vide pour admin
  menuTitle = 'Menu';
  menuTitleOuvert = 'Tableau de bord';
  menuItems = [
    { link: '/', label: 'Accueil', icon: 'assets/accueil.png' },
    { link: '/panier', label: 'Panier', icon: 'assets/panier.png' },
    { link: '/livraison', label: 'Livraison', icon: 'assets/camion.png' },
    { link: '/faits-divers', label: 'Faits Divers', icon: 'assets/faitsDivers.png' },
    { link: '/profil', label: 'Profil', icon: 'assets/pageprofil.png' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal() {
    this.showLoginModal = true;
  }

  closeModal() {
    this.showLoginModal = false;
  }

  onLogin() {
    const loginData = { name: this.username, password: this.password };
    let apiUrl = '';

    // Déterminer l'URL de l'API selon le rôle sélectionné
    if (this.role === 'adherent') {
      apiUrl = 'http://localhost:3000/api/login/adherent/connect';
    } else if (this.role === 'employe') {
      apiUrl = 'http://localhost:3000/api/login/employe/connect';
    } else {
      apiUrl = 'http://localhost:3000/api/login/admin';
    }

    this.http.post(apiUrl, loginData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          console.log('Connexion réussie', response);

          if (response.adherent || response.admin) {
            alert(`Bienvenue, ${this.username}!`);
            this.isLoggedIn = true;
          }

          this.closeModal();
          this.username = '';
          this.password = '';
          this.role = '';
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

  onLogout() {
    this.isLoggedIn = false;
    alert('Déconnexion réussie.');
  }
}
