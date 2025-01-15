import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeDataService } from '../shared/employe-data.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-formulaire-panier-employe',
  templateUrl: './formulaire-panier-employe.component.html',
  styleUrls: ['./formulaire-panier-employe.component.scss']
})
export class FormulairePanierEmployeComponent implements OnInit {
  // Propriétés des champs du formulaire
  nom: string = '';
  prenom: string = '';
  dateNaissance: string = '';
  email: string = '';
  adresse: string = '';
  ville: string = '';
  codePostal: string = '';

  // Email utilisateur connecté
  emailUtilisateur: string = '';

  constructor(
    private employeDataService: EmployeDataService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Récupérer l'email utilisateur via le UserService
    this.userService.currentUsername.subscribe((username) => {
      if (username) {
        this.userService.getUserEmailEmploye(username).then(
          (email) => {
            this.emailUtilisateur = email;
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'email Employe :', error);
            alert('Impossible de récupérer votre adresse email.');
          }
        );
      }
    });

    // Pré-remplir les champs si des données existent
    this.nom = this.employeDataService.getData('nom') || '';
    this.prenom = this.employeDataService.getData('prenom') || '';
    this.dateNaissance = this.employeDataService.getData('dateNaissance') || '';
    this.email = this.employeDataService.getData('email') || '';
    this.adresse = this.employeDataService.getData('adresse') || '';
    this.ville = this.employeDataService.getData('ville') || '';
    this.codePostal = this.employeDataService.getData('codePostal') || '';
  }

  onSubmit(): void {
    // Sauvegarder les données du formulaire
    this.employeDataService.setData('nom', this.nom);
    this.employeDataService.setData('prenom', this.prenom);
    this.employeDataService.setData('dateNaissance', this.dateNaissance);
    this.employeDataService.setData('email', this.email);
    this.employeDataService.setData('adresse', this.adresse);
    this.employeDataService.setData('ville', this.ville);
    this.employeDataService.setData('codePostal', this.codePostal);

    // Redirection vers la prochaine étape
    this.router.navigate(['/formulaire-choix-panier-employe']);
  }

  onBack(): void {
    // Redirection vers la page précédente
    this.router.navigate(['/panier-employe']);
  }
}
