import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/user.service'; // Import du service UserService
import { Router } from '@angular/router';

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
  role = ''; // Peut être "adherent" ou "employe"
  menuTitle = 'Menu';
  menuTitleOuvert = 'Tableau de bord';
  menuItems = [
    { link: '/', label: 'Accueil', icon: 'assets/accueil.png' },
    { link: '/panier', label: 'Panier', icon: 'assets/panier.png' },
    { link: '/livraison', label: 'Livraison', icon: 'assets/camion.png' },
    { link: '/faits-divers', label: 'Faits Divers', icon: 'assets/faitsDivers.png' },
    { link: '/profil', label: 'Profil', icon: 'assets/pageprofil.png' },
  ];

  // Variables pour l'inscription
  showSignupModal = false;
  signupUsername = '';
  signupPassword = '';
  signupEmail = '';
  signupRole = ''; // Peut être "adherent" ou "employe"

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {} // Injection du service

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
    let apiUrl = '';
    let loginData: any = {};

    // Déterminer l'URL de l'API et les données à envoyer selon le rôle sélectionné
    if (this.role === 'adherent') {
      apiUrl = 'http://localhost:3000/api/login/adherent/connect';
      loginData = { name: this.username, password: this.password }; // Utilise 'name' pour adherent
    } else if (this.role === 'employe') {
      apiUrl = 'http://localhost:3000/api/login/employe/connect';
      loginData = { name: this.username, password: this.password }; // Utilise 'name' pour employe
    } else {
      apiUrl = 'http://localhost:3000/api/login/admin';
      loginData = { username: this.username, password: this.password }; // Utilise 'username' pour admin
    }

    this.http.post(apiUrl, loginData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          console.log('Connexion réussie', response);

          // Vérification du rôle dans la réponse de l'API
          if (response.adherent) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Adhérent.`);
            this.isLoggedIn = true;
            this.userService.setLoggedIn(true); // Ajout ici

            // Mettre à jour le username dans le service après confirmation de la connexion réussie
            this.userService.setUsername(this.username);
          } else if (response.employe) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Employé.`);
            this.isLoggedIn = true;
            this.userService.setLoggedIn(true); // Ajout ici

            // Mettre à jour le username dans le service
            this.userService.setUsername(this.username);
          } else if (response.admin) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Administrateur.`);
            this.isLoggedIn = true;
            this.userService.setLoggedIn(true); // Ajout ici

            // Mettre à jour le username dans le service
            this.userService.setUsername(this.username);
          }

          // Réinitialiser le formulaire après connexion
          this.closeModal();
          this.username = ''; // Réinitialisé après avoir été stocké dans le service
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

  onLogout(): void {
    this.isLoggedIn = false;
  
    // Mettre à jour l'état de connexion global dans UserService
    this.userService.setLoggedIn(false);
  
    // Réinitialiser le username dans le service
    this.userService.setUsername('');

    // Redirection vers la page d'accueil
    this.router.navigate(['/']); // Redirige vers l'accueil
  
    alert('Déconnexion réussie.');
  }
  

  // Méthodes pour l'inscription
  openSignupModal() {
    this.showSignupModal = true;
  }

  closeSignupModal() {
    this.showSignupModal = false;
  }

  onSignup() {
    let apiUrl = '';
    let signupData: any = {};

    // Déterminer l'URL de l'API et les données à envoyer selon le rôle sélectionné
    if (this.signupRole === 'adherent') {
      apiUrl = 'http://localhost:3000/api/login/adherent';
      signupData = { 
        name: this.signupUsername, 
        password: this.signupPassword, 
        email: this.signupEmail 
      }; // Utilise 'name' pour adherent
    } else if (this.signupRole === 'employe') {
      apiUrl = 'http://localhost:3000/api/login/employe';
      signupData = { 
        name: this.signupUsername, 
        password: this.signupPassword, 
        email: this.signupEmail 
      }; // Utilise 'name' pour employe
    } else {
      alert('Veuillez sélectionner un rôle valide pour l\'inscription.');
      return;
    }

    this.http.post(apiUrl, signupData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          console.log('Inscription réussie', response);
          alert(`Inscription réussie pour ${this.signupUsername}! (${this.signupRole})`);

          // Réinitialiser le formulaire après inscription
          this.closeSignupModal();
          this.signupUsername = '';
          this.signupPassword = '';
          this.signupEmail = '';
          this.signupRole = '';
        },
        error => {
          console.error('Erreur d\'inscription', error);
          
          if (error.status === 400) {
            alert('Données d\'inscription invalides. Veuillez vérifier vos informations.');
          } else {
            alert('Erreur interne du serveur. Veuillez réessayer plus tard.');
          }
        }
      );
  }
}
