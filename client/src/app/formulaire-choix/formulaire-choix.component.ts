import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-choix',
  templateUrl: './formulaire-choix.component.html',
  styleUrls: ['./formulaire-choix.component.scss']
})
export class FormulaireChoixComponent implements OnInit {
  panierLegumes: string = '';
  panierFruits: boolean = false;
  nbPanierFruits: number = 0;
  boiteOeuf: boolean = false;
  nbBoiteOeuf: number = 0;
  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1); // Liste de 1 à 20 pour la sélection

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    // Charger les données enregistrées si elles existent
    this.panierLegumes = this.adherentDataService.getData('panierLegumes') || '';
    this.panierFruits = this.adherentDataService.getData('panierFruits') || false;
    this.nbPanierFruits = this.adherentDataService.getData('nbPanierFruits') || 0;
    this.boiteOeuf = this.adherentDataService.getData('boiteOeuf') || false;
    this.nbBoiteOeuf = this.adherentDataService.getData('nbBoiteOeuf') || 0;
  }

  // Sauvegarder les données et passer à la page suivante
  onNext(): void {
    this.adherentDataService.setData('panierLegumes', this.panierLegumes);
    this.adherentDataService.setData('panierFruits', this.panierFruits);
    this.adherentDataService.setData('nbPanierFruits', this.nbPanierFruits);
    this.adherentDataService.setData('boiteOeuf', this.boiteOeuf);
    this.adherentDataService.setData('nbBoiteOeuf', this.nbBoiteOeuf);

    // Naviguer vers la page suivante
    this.router.navigate(['/app-formulaire-mode-livraison']);
  }
}
