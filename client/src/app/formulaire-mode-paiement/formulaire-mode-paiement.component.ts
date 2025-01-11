import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-mode-paiement',
  templateUrl: './formulaire-mode-paiement.component.html',
  styleUrls: ['./formulaire-mode-paiement.component.scss']
})
export class FormulaireModePaiementComponent implements OnInit {
  paiementOption: string = ''; 

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.paiementOption = this.adherentDataService.getData('paiementOption') || '';
  }

  onNext(): void {
    if (!this.paiementOption) {
      alert('Veuillez choisir une formule de paiement.');
      return;
    }

    this.adherentDataService.setData('paiementOption', this.paiementOption);

    this.router.navigate(['/app-formulaire-iban']);
  }

  onBack(): void {
    this.router.navigate(['/app-formulaire-mode-livraison']);
  }
}
