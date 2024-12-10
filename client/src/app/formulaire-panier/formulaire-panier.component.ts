import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-panier',
  templateUrl: './formulaire-panier.component.html',
  styleUrls: ['./formulaire-panier.component.scss']
})
export class FormulairePanierComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  dateNaissance: string = '';
  email: string = '';
  adresse: string = '';
  ville: string = '';
  codePostal: string = '';

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    // Charger les données sauvegardées si elles existent
    this.nom = this.adherentDataService.getData('nom') || '';
    this.prenom = this.adherentDataService.getData('prenom') || '';
    this.dateNaissance = this.adherentDataService.getData('dateNaissance') || '';
    this.email = this.adherentDataService.getData('email') || '';
    this.adresse = this.adherentDataService.getData('adresse') || '';
    this.ville = this.adherentDataService.getData('ville') || '';
    this.codePostal = this.adherentDataService.getData('codePostal') || '';
  }

  // Sauvegarder les données et naviguer vers la page suivante
  onNext(): void {
    if (!this.nom || !this.prenom || !this.dateNaissance || !this.email || !this.adresse || !this.ville || !this.codePostal) {
      alert('Veuillez remplir tous les champs obligatoires.');
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
    this.router.navigate(['/app-formulaire-cotisation']);
  }

  // Retourner à la page précédente
  onBack(): void {
    this.router.navigate(['/app-panier']);
  }
}
