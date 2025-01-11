import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-mode-livraison',
  templateUrl: './formulaire-mode-livraison.component.html',
  styleUrls: ['./formulaire-mode-livraison.component.scss']
})
export class FormulaireModeLivraisonComponent implements OnInit {
  depot: string = ''; 
  domicile: boolean = false;

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.depot = this.adherentDataService.getData('depot') || '';
    this.domicile = this.adherentDataService.getData('domicile') || false;
  }

  onNext(): void {
    if (!this.depot && !this.domicile) {
      alert('Veuillez choisir un mode de livraison (Dépôt ou Domicile).');
      return;
    }

    this.adherentDataService.setData('depot', this.depot);
    this.adherentDataService.setData('domicile', this.domicile);

    this.router.navigate(['/app-formulaire-mode-paiement']);
  }

  onBack(): void {
    this.router.navigate(['/app-formulaire-choix']);
  }

  onChooseWeeks(): void {
    this.router.navigate(['/app-formulaire-semaine-livraison']);
  }
}
