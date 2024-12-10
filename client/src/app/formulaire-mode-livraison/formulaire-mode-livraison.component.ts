import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-mode-livraison',
  templateUrl: './formulaire-mode-livraison.component.html',
  styleUrls: ['./formulaire-mode-livraison.component.scss']
})
export class FormulaireModeLivraisonComponent implements OnInit {
  depot: string = ''; // Numéro ou description du dépôt
  domicile: boolean = false; // Livraison à domicile

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    // Charger les données sauvegardées si elles existent
    this.depot = this.adherentDataService.getData('depot') || '';
    this.domicile = this.adherentDataService.getData('domicile') || false;
  }

  // Sauvegarder les données et naviguer vers la page suivante
  onNext(): void {
    if (!this.depot && !this.domicile) {
      alert('Veuillez choisir un mode de livraison (Dépôt ou Domicile).');
      return;
    }

    // Sauvegarder les données dans le service
    this.adherentDataService.setData('depot', this.depot);
    this.adherentDataService.setData('domicile', this.domicile);

    // Naviguer vers la page suivante
    this.router.navigate(['/app-formulaire-mode-paiement']);
  }

  // Retourner à la page précédente
  onBack(): void {
    this.router.navigate(['/app-formulaire-choix']);
  }

  // Naviguer vers la page des choix des semaines
  onChooseWeeks(): void {
    this.router.navigate(['/app-formulaire-semaine-livraison']);
  }
}
