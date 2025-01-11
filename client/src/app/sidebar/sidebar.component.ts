import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/user.service'; 
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
  role = ''; 
  menuTitle = 'Menu';
  menuTitleOuvert = 'Tableau de bord';
  menuItems = [
    { link: '/', label: 'Accueil', icon: 'assets/accueil.png' },
    { link: '/panier', label: 'Panier', icon: 'assets/panier.png' },
    { link: '/livraison', label: 'Livraison', icon: 'assets/camion.png' },
    { link: '/faits-divers', label: 'Faits Divers', icon: 'assets/faitsDivers.png' },
    { link: '/profil', label: 'Profil', icon: 'assets/pageprofil.png' },
  ];

  showSignupModal = false;
  signupUsername = '';
  signupPassword = '';
  signupEmail = '';
  signupRole = ''; 

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {} 

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
  
    if (this.role === 'adherent') {
      apiUrl = 'http://localhost:3000/api/login/adherent/connect';
      loginData = { name: this.username, password: this.password };
    } else if (this.role === 'employe') {
      apiUrl = 'http://localhost:3000/api/login/employe/connect';
      loginData = { name: this.username, password: this.password };
    } else {
      apiUrl = 'http://localhost:3000/api/login/admin';
      loginData = { username: this.username, password: this.password };
    }
  
    this.http.post(apiUrl, loginData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          console.log('Connexion réussie', response);
  
          if (response.adherent) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Adhérent.`);
            this.isLoggedIn = true;
            this.role = 'adherent';
          } else if (response.employe) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Employé.`);
            this.isLoggedIn = true;
            this.role = 'employe';
          } else if (response.admin) {
            alert(`Bienvenue, ${this.username}! Vous êtes connecté en tant qu'Administrateur.`);
            this.isLoggedIn = true;
            this.role = 'admin';
          }
  
          this.userService.setLoggedIn(this.isLoggedIn);
          this.userService.setUsername(this.username);
          this.userService.setRole(this.role); 
  
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

  onLogout(): void {
    this.isLoggedIn = false;
    this.role = ''; 
    this.userService.setLoggedIn(false);
    this.userService.setUsername('');
    this.userService.setRole('');
    this.router.navigate(['/']);
    alert('Déconnexion réussie.');
  }

  openSignupModal() {
    this.showSignupModal = true;
  }

  closeSignupModal() {
    this.showSignupModal = false;
  }

  onSignup() {
    let apiUrl = '';
    let signupData: any = {};

    if (this.signupRole === 'adherent') {
      apiUrl = 'http://localhost:3000/api/login/adherent';
      signupData = { 
        name: this.signupUsername, 
        password: this.signupPassword, 
        email: this.signupEmail 
      }; 
    } else if (this.signupRole === 'employe') {
      apiUrl = 'http://localhost:3000/api/login/employe';
      signupData = { 
        name: this.signupUsername, 
        password: this.signupPassword, 
        email: this.signupEmail 
      }; 
    } else {
      alert('Veuillez sélectionner un rôle valide pour l\'inscription.');
      return;
    }

    this.http.post(apiUrl, signupData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          console.log('Inscription réussie', response);
          alert(`Inscription réussie pour ${this.signupUsername}! (${this.signupRole})`);

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
