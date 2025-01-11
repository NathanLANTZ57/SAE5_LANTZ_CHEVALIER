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
  selectedWeeks: number[] = []; 

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.initializeWeeks();
    this.selectedWeeks = this.adherentDataService.getData('selectedWeeks') || [];
  }

  initializeWeeks(): void {
    for (let i = 0; i < 12; i++) {
      this.weeks[i] = [1, 2, 3, 4, 5];
    }
  }

  isSelected(week: number): boolean {
    return this.selectedWeeks.includes(week);
  }

  toggleSelection(week: number): void {
    if (!week) return; 
    const index = this.selectedWeeks.indexOf(week);
    if (index === -1) {
      this.selectedWeeks.push(week);
    } else {
      this.selectedWeeks.splice(index, 1);
    }
  }

  isDisabled(week: number): boolean {
    return false; 
  }

  onNext(): void {
    if (this.selectedWeeks.length === 0) {
      alert('Veuillez sélectionner au moins une semaine.');
      return;
    }

    this.adherentDataService.setData('selectedWeeks', this.selectedWeeks);

    this.router.navigate(['/app-formulaire-mode-livraison']);
  }

  onBack(): void {
    this.router.navigate(['/app-formulaire-choix']);
  }
}
