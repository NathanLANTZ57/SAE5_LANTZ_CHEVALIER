import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-cotisation',
  templateUrl: './formulaire-cotisation.component.html',
  styleUrls: ['./formulaire-cotisation.component.scss']
})
export class FormulaireCotisationComponent implements OnInit {
  cotisationOption: string = ''; // 'cotisation' ou 'cotisationDon'
  montantDon: number = 0; // Montant du don
  totalCotisation: number = 5; // Total de la cotisation (par défaut 5 €)

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    // Charger les données sauvegardées si elles existent
    this.cotisationOption = this.adherentDataService.getData('cotisationOption') || '';
    this.montantDon = this.adherentDataService.getData('montantDon') || 0;

    // Mettre à jour la cotisation en fonction des données chargées
    this.updateCotisation();
  }

  // Mettre à jour la cotisation totale en fonction du choix de l'utilisateur
  updateCotisation(): void {
    if (this.cotisationOption === 'cotisation') {
      this.totalCotisation = 5; // Cotisation fixe
    } else if (this.cotisationOption === 'cotisationDon') {
      this.totalCotisation = 5 + (this.montantDon > 0 ? this.montantDon : 0); // Cotisation + don
    } else {
      this.totalCotisation = 0; // Par défaut, aucune cotisation
    }
  }

  // Sauvegarder les données et naviguer vers la page suivante
  onNext(): void {
    if (this.cotisationOption === 'cotisationDon' && this.montantDon <= 0) {
      alert("Veuillez entrer un montant valide pour le don.");
      return;
    }

    // Enregistrer les données dans le service
    this.adherentDataService.setData('cotisationOption', this.cotisationOption);
    this.adherentDataService.setData('montantDon', this.montantDon);
    this.adherentDataService.setData('totalCotisation', this.totalCotisation);

    console.log('Données sauvegardées :', {
      cotisationOption: this.cotisationOption,
      montantDon: this.montantDon,
      totalCotisation: this.totalCotisation,
    });

    // Naviguer vers la page suivante
    this.router.navigate(['/app-formulaire-choix']);
  }
}
