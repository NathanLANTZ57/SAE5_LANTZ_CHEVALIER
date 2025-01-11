import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-formulaire-panier-employe',
  templateUrl: './formulaire-panier-employe.component.html',
  styleUrls: ['./formulaire-panier-employe.component.scss']
})
export class FormulairePanierEmployeComponent implements OnInit {

    nom: string = '';
    prenom: string = '';
    dateNaissance: string = '';
    email: string = '';
    adresse: string = '';
    ville: string = '';
    codePostal: string = '';
  
    emailUtilisateur: string = ''; // Stockage de l'e-mail de l'utilisateur connecté
  
    constructor(
      private adherentDataService: AdherentDataService,
      private router: Router,
      private userService: UserService // Injection du service UserService
    ) {}
  
    ngOnInit(): void {
      // Récupérer l'e-mail de l'utilisateur connecté
      this.userService.currentUsername.subscribe((username) => {
        if (username) {
          this.userService.getUserEmail(username).then(
            (email) => {
              this.emailUtilisateur = email; // Stockez l'email réel
            },
            (error) => {
              console.error('Erreur lors de la récupération de l\'email utilisateur :', error);
              alert('Impossible de récupérer votre adresse email.');
            }
          );
        }
      });
  
      // Charger les données sauvegardées
      this.nom = this.adherentDataService.getData('nom') || '';
      this.prenom = this.adherentDataService.getData('prenom') || '';
      this.dateNaissance = this.adherentDataService.getData('dateNaissance') || '';
      this.email = this.adherentDataService.getData('email') || '';
      this.adresse = this.adherentDataService.getData('adresse') || '';
      this.ville = this.adherentDataService.getData('ville') || '';
      this.codePostal = this.adherentDataService.getData('codePostal') || '';
    }
  
    onNext(): void {
      if (!this.nom || !this.prenom || !this.dateNaissance || !this.email || !this.adresse || !this.ville || !this.codePostal) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }
  
      // Vérifier que l'e-mail correspond à celui de l'utilisateur connecté
      if (this.email !== this.emailUtilisateur) {
        alert('L\'adresse e-mail saisie ne correspond pas à celle utilisée lors de la connexion.');
        return;
      }
  
      // Sauvegarder les données dans le service
      this.adherentDataService.setData('nom', this.nom);
      this.adherentDataService.setData('prenom', this.prenom);
      this.adherentDataService.setData('dateNaissance', this.dateNaissance);
      this.adherentDataService.setData('email', this.email);
      this.adherentDataService.setData('adresse', this.adresse);
      this.adherentDataService.setData('ville', this.ville);
      this.adherentDataService.setData('codePostal', this.codePostal);
  
      // Naviguer vers la page suivante
      this.router.navigate(['/formulaire-choix-panier-employe']);
    }
  
    onBack(): void {
      this.router.navigate(['/panier-employe']);
    }

}
