import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-mode-paiement',
  templateUrl: './formulaire-mode-paiement.component.html',
  styleUrls: ['./formulaire-mode-paiement.component.scss']
})
export class FormulaireModePaiementComponent implements OnInit {
  paiementOption: string = ''; // Option de paiement sélectionnée

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    // Charger la formule de paiement sauvegardée si elle existe
    this.paiementOption = this.adherentDataService.getData('paiementOption') || '';
  }

  // Sauvegarder la formule de paiement et naviguer vers la page suivante
  onNext(): void {
    if (!this.paiementOption) {
      alert('Veuillez choisir une formule de paiement.');
      return;
    }

    // Sauvegarder dans le service
    this.adherentDataService.setData('paiementOption', this.paiementOption);

    // Naviguer vers la page suivante
    this.router.navigate(['/app-formulaire-iban']);
  }

  // Retourner à la page précédente
  onBack(): void {
    this.router.navigate(['/app-formulaire-mode-livraison']);
  }
}
