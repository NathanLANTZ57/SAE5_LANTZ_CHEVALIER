import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-semaine-livraison',
  templateUrl: './formulaire-semaine-livraison.component.html',
  styleUrls: ['./formulaire-semaine-livraison.component.scss']
})
export class FormulaireSemaineLivraisonComponent implements OnInit {
  year: number = new Date().getFullYear();
  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  weeks: number[][] = [];
  selectedWeeks: number[] = []; // Liste des semaines sélectionnées

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.initializeWeeks();
    // Charger les semaines sélectionnées précédemment
    this.selectedWeeks = this.adherentDataService.getData('selectedWeeks') || [];
  }

  // Initialiser les semaines (simule 5 semaines par mois)
  initializeWeeks(): void {
    for (let i = 0; i < 12; i++) {
      this.weeks[i] = [1, 2, 3, 4, 5];
    }
  }

  // Vérifie si une semaine est sélectionnée
  isSelected(week: number): boolean {
    return this.selectedWeeks.includes(week);
  }

  // Active ou désactive une semaine
  toggleSelection(week: number): void {
    if (!week) return; // Ignore les valeurs nulles ou 0
    const index = this.selectedWeeks.indexOf(week);
    if (index === -1) {
      this.selectedWeeks.push(week);
    } else {
      this.selectedWeeks.splice(index, 1);
    }
  }

  // Vérifie si une semaine est désactivée (exemple : semaines inactives, si applicable)
  isDisabled(week: number): boolean {
    return false; // Modifiez cette logique si certaines semaines doivent être désactivées
  }

  // Sauvegarder les semaines sélectionnées et passer à la page suivante
  onNext(): void {
    if (this.selectedWeeks.length === 0) {
      alert('Veuillez sélectionner au moins une semaine.');
      return;
    }

    // Sauvegarder dans le service
    this.adherentDataService.setData('selectedWeeks', this.selectedWeeks);

    // Naviguer vers la page suivante
    this.router.navigate(['/app-formulaire-mode-livraison']);
  }

  // Retourner à la page précédente
  onBack(): void {
    this.router.navigate(['/app-formulaire-choix']);
  }
}
